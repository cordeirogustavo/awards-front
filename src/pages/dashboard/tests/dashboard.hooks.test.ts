import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	useMaxMinWinInterval,
	useStudiosWithWinCount,
	useWinnersByYear,
	useYearsWithMultipleWinners,
} from "@/api/hooks";
import { mockQueryResult } from "@/tests/mock-query";
import { useDashboardPage } from "../dashboard.hooks";

vi.mock("@/api/hooks", () => ({
	useYearsWithMultipleWinners: vi.fn(),
	useStudiosWithWinCount: vi.fn(),
	useMaxMinWinInterval: vi.fn(),
	useWinnersByYear: vi.fn(),
}));

const mockedUseYearsWithMultipleWinners = vi.mocked(
	useYearsWithMultipleWinners,
);
const mockedUseStudiosWithWinCount = vi.mocked(useStudiosWithWinCount);
const mockedUseMaxMinWinInterval = vi.mocked(useMaxMinWinInterval);
const mockedUseWinnersByYear = vi.mocked(useWinnersByYear);

describe("useDashboardPage", () => {
	beforeEach(() => {
		mockedUseYearsWithMultipleWinners.mockReturnValue(
			mockQueryResult<typeof useYearsWithMultipleWinners>({
				data: undefined,
				isLoading: false,
			}),
		);
		mockedUseStudiosWithWinCount.mockReturnValue(
			mockQueryResult<typeof useStudiosWithWinCount>({
				data: undefined,
				isLoading: false,
			}),
		);
		mockedUseMaxMinWinInterval.mockReturnValue(
			mockQueryResult<typeof useMaxMinWinInterval>({
				data: undefined,
				isLoading: false,
			}),
		);
		mockedUseWinnersByYear.mockReturnValue(
			mockQueryResult<typeof useWinnersByYear>({
				data: undefined,
				isLoading: false,
			}),
		);
	});

	it("defaults all table data to empty arrays when no data is returned", () => {
		const { result } = renderHook(() => useDashboardPage());

		expect(result.current.yearsWithMultipleWinnersData).toEqual([]);
		expect(result.current.studiosWithWinCountData).toEqual([]);
		expect(result.current.maxIntervalProducersData).toEqual([]);
		expect(result.current.minIntervalProducersData).toEqual([]);
		expect(result.current.winnersByYearData).toEqual([]);
	});

	it("returns the years with multiple winners as-is", () => {
		const years = [
			{ year: 2015, winnerCount: 2 },
			{ year: 2016, winnerCount: 3 },
		];
		mockedUseYearsWithMultipleWinners.mockReturnValue(
			mockQueryResult<typeof useYearsWithMultipleWinners>({
				data: { years },
				isLoading: false,
			}),
		);

		const { result } = renderHook(() => useDashboardPage());

		expect(result.current.yearsWithMultipleWinnersData).toEqual(years);
	});

	it("returns the top 3 studios sorted by win count, treating missing counts as 0", () => {
		const studios = [
			{ name: "A", winCount: 5 },
			{ name: "B", winCount: 10 },
			{ name: "C" },
			{ name: "D", winCount: 7 },
			{ name: "E", winCount: 1 },
		];
		mockedUseStudiosWithWinCount.mockReturnValue(
			mockQueryResult<typeof useStudiosWithWinCount>({
				data: { studios },
				isLoading: false,
			}),
		);

		const { result } = renderHook(() => useDashboardPage());

		expect(result.current.studiosWithWinCountData).toEqual([
			{ name: "B", winCount: 10 },
			{ name: "D", winCount: 7 },
			{ name: "A", winCount: 5 },
		]);
	});

	it("returns max and min producer interval data", () => {
		const max = [
			{ producer: "P1", interval: 10, previousWin: 2000, followingWin: 2010 },
		];
		const min = [
			{ producer: "P2", interval: 1, previousWin: 2005, followingWin: 2006 },
		];
		mockedUseMaxMinWinInterval.mockReturnValue(
			mockQueryResult<typeof useMaxMinWinInterval>({
				data: { max, min },
				isLoading: false,
			}),
		);

		const { result } = renderHook(() => useDashboardPage());

		expect(result.current.maxIntervalProducersData).toEqual(max);
		expect(result.current.minIntervalProducersData).toEqual(min);
	});

	it("rejects an invalid year and reports the validation message on the input", () => {
		const { result } = renderHook(() => useDashboardPage());

		const input = document.createElement("input");
		const setCustomValiditySpy = vi.spyOn(input, "setCustomValidity");
		const reportValiditySpy = vi
			.spyOn(input, "reportValidity")
			.mockImplementation(() => true);
		input.value = "not-a-year";
		result.current.searchByYearInput.current = input;

		act(() => {
			result.current.handleSearchByYear();
		});

		expect(setCustomValiditySpy).toHaveBeenCalledWith(
			expect.stringMatching(/year/i),
		);
		expect(reportValiditySpy).toHaveBeenCalled();
	});

	it("accepts a valid year and triggers the winners-by-year query with it", () => {
		const { result } = renderHook(() => useDashboardPage());

		const input = document.createElement("input");
		const setCustomValiditySpy = vi.spyOn(input, "setCustomValidity");
		input.value = "2010";
		result.current.searchByYearInput.current = input;

		act(() => {
			result.current.handleSearchByYear();
		});

		expect(setCustomValiditySpy).toHaveBeenCalledWith("");

		const lastCall = mockedUseWinnersByYear.mock.calls.at(-1);
		expect(lastCall?.[0]).toEqual({ year: 2010 });
	});
});
