import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	useFindMaxMinWinIntervalForProducers,
	useFindStudiosWithWinCount,
	useFindWinnersByYear,
	useFindYearsWithMultipleWinners,
} from "@/api/generated";
import { mockQueryResult } from "@/tests/mock-query";
import { useDashboardPage } from "../dashboard.hooks";

vi.mock("@/api/generated", () => ({
	useFindYearsWithMultipleWinners: vi.fn(),
	useFindStudiosWithWinCount: vi.fn(),
	useFindMaxMinWinIntervalForProducers: vi.fn(),
	useFindWinnersByYear: vi.fn(),
}));

const mockedUseFindYearsWithMultipleWinners = vi.mocked(
	useFindYearsWithMultipleWinners,
);
const mockedUseFindStudiosWithWinCount = vi.mocked(useFindStudiosWithWinCount);
const mockedUseFindMaxMinWinIntervalForProducers = vi.mocked(
	useFindMaxMinWinIntervalForProducers,
);
const mockedUseFindWinnersByYear = vi.mocked(useFindWinnersByYear);

describe("useDashboardPage", () => {
	beforeEach(() => {
		mockedUseFindYearsWithMultipleWinners.mockReturnValue(
			mockQueryResult<typeof useFindYearsWithMultipleWinners>({
				data: undefined,
				isLoading: false,
			}),
		);
		mockedUseFindStudiosWithWinCount.mockReturnValue(
			mockQueryResult<typeof useFindStudiosWithWinCount>({
				data: undefined,
				isLoading: false,
			}),
		);
		mockedUseFindMaxMinWinIntervalForProducers.mockReturnValue(
			mockQueryResult<typeof useFindMaxMinWinIntervalForProducers>({
				data: undefined,
				isLoading: false,
			}),
		);
		mockedUseFindWinnersByYear.mockReturnValue(
			mockQueryResult<typeof useFindWinnersByYear>({
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
		mockedUseFindYearsWithMultipleWinners.mockReturnValue(
			mockQueryResult<typeof useFindYearsWithMultipleWinners>({
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
		mockedUseFindStudiosWithWinCount.mockReturnValue(
			mockQueryResult<typeof useFindStudiosWithWinCount>({
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
		mockedUseFindMaxMinWinIntervalForProducers.mockReturnValue(
			mockQueryResult<typeof useFindMaxMinWinIntervalForProducers>({
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

		const lastCall = mockedUseFindWinnersByYear.mock.calls.at(-1);
		expect(lastCall?.[0]).toEqual({ year: 2010 });
	});
});
