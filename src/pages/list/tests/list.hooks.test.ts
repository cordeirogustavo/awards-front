import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFind as useFindMovies } from "@/api/generated";
import { mockQueryResult } from "@/tests/mock-query";
import { LIST_PAGE_SIZE } from "../list.schemas";

const { mockUseSearch, mockUseNavigate } = vi.hoisted(() => ({
	mockUseSearch: vi.fn(),
	mockUseNavigate: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
	getRouteApi: () => ({
		useSearch: mockUseSearch,
		useNavigate: mockUseNavigate,
	}),
}));

vi.mock("@/api/generated", () => ({
	useFind: vi.fn(),
}));

const mockedUseFindMovies = vi.mocked(useFindMovies);

const { useListPage } = await import("../list.hooks");

describe("useListPage", () => {
	let navigateSpy: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		vi.useFakeTimers();
		navigateSpy = vi.fn();
		mockUseNavigate.mockReturnValue(navigateSpy);
		mockUseSearch.mockReturnValue({
			page: 0,
			year: undefined,
			winner: undefined,
		});
		mockedUseFindMovies.mockReturnValue(
			mockQueryResult<typeof useFindMovies>({
				data: undefined,
				isLoading: false,
			}),
		);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("defaults movies data and totals when no data is returned", () => {
		const { result } = renderHook(() => useListPage());

		expect(result.current.moviesData).toEqual([]);
		expect(result.current.totalPages).toBe(0);
		expect(result.current.pageSize).toBe(LIST_PAGE_SIZE);
	});

	it("returns movies and total pages from the query result", () => {
		const movies = [{ id: 1, title: "Movie A", year: 2010 }];
		mockedUseFindMovies.mockReturnValue(
			mockQueryResult<typeof useFindMovies>({
				data: { content: movies, totalPages: 4 },
				isLoading: false,
			}),
		);

		const { result } = renderHook(() => useListPage());

		expect(result.current.moviesData).toEqual(movies);
		expect(result.current.totalPages).toBe(4);
	});

	it("reads pageIndex, year and winner filters from the route search params", () => {
		mockUseSearch.mockReturnValue({ page: 2, year: 2015, winner: true });

		const { result } = renderHook(() => useListPage());

		expect(result.current.pageIndex).toBe(2);
		expect(result.current.yearFilter).toBe(2015);
		expect(result.current.winnerFilter).toBe(true);
	});

	it("does not navigate on initial render even after the debounce delay", () => {
		renderHook(() => useListPage());

		act(() => {
			vi.advanceTimersByTime(500);
		});

		expect(navigateSpy).not.toHaveBeenCalled();
	});

	it("navigates with the updated year filter and resets the page after the debounce delay", () => {
		const { result } = renderHook(() => useListPage());

		act(() => {
			result.current.onYearFilterChange({
				target: { value: "2020" },
			} as React.ChangeEvent<HTMLInputElement>);
		});
		act(() => {
			vi.advanceTimersByTime(500);
		});

		expect(navigateSpy).toHaveBeenCalledTimes(1);
		const { search } = navigateSpy.mock.calls[0][0];
		expect(search({ page: 2, year: undefined, winner: undefined })).toEqual({
			page: 0,
			year: 2020,
			winner: undefined,
		});
	});

	it("navigates with the updated winner filter after the debounce delay", () => {
		const { result } = renderHook(() => useListPage());

		act(() => {
			result.current.onWinnerFilterChange({
				target: { value: "true" },
			} as React.ChangeEvent<HTMLSelectElement>);
		});
		act(() => {
			vi.advanceTimersByTime(500);
		});

		expect(navigateSpy).toHaveBeenCalledTimes(1);
		const { search } = navigateSpy.mock.calls[0][0];
		expect(search({ page: 2, year: undefined, winner: undefined })).toEqual({
			page: 0,
			year: undefined,
			winner: true,
		});
	});

	it("clears the year filter when the input is emptied", () => {
		mockUseSearch.mockReturnValue({ page: 0, year: 2015, winner: undefined });
		const { result } = renderHook(() => useListPage());

		act(() => {
			result.current.onYearFilterChange({
				target: { value: "" },
			} as React.ChangeEvent<HTMLInputElement>);
		});
		act(() => {
			vi.advanceTimersByTime(500);
		});

		const { search } = navigateSpy.mock.calls[0][0];
		expect(
			search({ page: 0, year: 2015, winner: undefined }).year,
		).toBeUndefined();
	});

	it("clears the winner filter when the select is reset", () => {
		mockUseSearch.mockReturnValue({ page: 0, year: undefined, winner: true });
		const { result } = renderHook(() => useListPage());

		act(() => {
			result.current.onWinnerFilterChange({
				target: { value: "" },
			} as React.ChangeEvent<HTMLSelectElement>);
		});
		act(() => {
			vi.advanceTimersByTime(500);
		});

		const { search } = navigateSpy.mock.calls[0][0];
		expect(
			search({ page: 0, year: undefined, winner: true }).winner,
		).toBeUndefined();
	});

	it("navigates to the requested page on page change", () => {
		const { result } = renderHook(() => useListPage());

		act(() => {
			result.current.onPageChange(3);
		});

		expect(navigateSpy).toHaveBeenCalledTimes(1);
		const { search } = navigateSpy.mock.calls[0][0];
		expect(search({ page: 0, year: 2010 })).toEqual({ page: 3, year: 2010 });
	});
});
