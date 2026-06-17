import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiFetch } from "./fetch";
import type {
	MaxMinWinIntervalForProducersResponse,
	MovieResponse,
	MoviesParams,
	PageMovieResponse,
	StudiosWithWinCountResponse,
	YearsWithMultipleWinnersResponse,
} from "./types";

export function moviesQueryOptions(params: MoviesParams) {
	return queryOptions({
		queryKey: ["movies", params] as const,
		queryFn: ({ signal }) =>
			apiFetch<PageMovieResponse>("/api/movies", params, signal),
	});
}

export function useMovies(params: MoviesParams) {
	return useQuery(moviesQueryOptions(params));
}

export function yearsWithMultipleWinnersQueryOptions() {
	return queryOptions({
		queryKey: ["yearsWithMultipleWinners"] as const,
		queryFn: ({ signal }) =>
			apiFetch<YearsWithMultipleWinnersResponse>(
				"/api/movies/yearsWithMultipleWinners",
				undefined,
				signal,
			),
	});
}

export function useYearsWithMultipleWinners() {
	return useQuery(yearsWithMultipleWinnersQueryOptions());
}

export function useStudiosWithWinCount() {
	return useQuery({
		queryKey: ["studiosWithWinCount"] as const,
		queryFn: ({ signal }) =>
			apiFetch<StudiosWithWinCountResponse>(
				"/api/movies/studiosWithWinCount",
				undefined,
				signal,
			),
	});
}

export function useMaxMinWinInterval() {
	return useQuery({
		queryKey: ["maxMinWinInterval"] as const,
		queryFn: ({ signal }) =>
			apiFetch<MaxMinWinIntervalForProducersResponse>(
				"/api/movies/maxMinWinIntervalForProducers",
				undefined,
				signal,
			),
	});
}

export function useWinnersByYear(
	params: { year: number },
	options?: { query?: { enabled?: boolean } },
) {
	return useQuery({
		queryKey: ["winnersByYear", params] as const,
		queryFn: ({ signal }) =>
			apiFetch<MovieResponse[]>("/api/movies/winnersByYear", params, signal),
		enabled: options?.query?.enabled,
	});
}
