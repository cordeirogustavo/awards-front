import { getRouteApi } from "@tanstack/react-router";
import React from "react";
import {
	type MovieResponse,
	type TFindQueryParams,
	useFind as useFindMovies,
} from "@/api/generated";
import { useDebounce } from "@/hooks";
import { LIST_PAGE_SIZE } from "./list.schemas";

const routeApi = getRouteApi("/(public)/list");

type IMoviesFilters = Pick<TFindQueryParams, "year" | "winner">;

export interface IListPageHooks {
	moviesData: MovieResponse[];
	isLoadingMovies: boolean;
	pageIndex: number;
	pageSize: number;
	totalPages: number;
	onPageChange: (pageIndex: number) => void;
	yearFilter: TFindQueryParams["year"];
	winnerFilter: TFindQueryParams["winner"];
	onYearFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onWinnerFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const useListPage = (): IListPageHooks => {
	const search = routeApi.useSearch();
	const navigate = routeApi.useNavigate();

	const [filters, setFilters] = React.useState<IMoviesFilters>({
		year: search.year,
		winner: search.winner,
	});
	const debouncedFilters = useDebounce(filters, 500);

	const isFirstRender = React.useRef(true);

	React.useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		navigate({
			search: (prev) => ({
				...prev,
				page: 0,
				year: debouncedFilters.year,
				winner: debouncedFilters.winner,
			}),
		});
	}, [debouncedFilters, navigate]);

	const { data: moviesPage, isLoading: isLoadingMovies } = useFindMovies({
		page: search.page,
		size: LIST_PAGE_SIZE,
		year: search.year,
		winner: search.winner,
	});

	const onPageChange = React.useCallback(
		(pageIndex: number) => {
			navigate({
				search: (prev) => ({ ...prev, page: pageIndex }),
			});
		},
		[navigate],
	);

	const onYearFilterChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setFilters((prev) => ({
				...prev,
				year: value ? Number(value) : undefined,
			}));
		},
		[],
	);

	const onWinnerFilterChange = React.useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const value = event.target.value;
			setFilters((prev) => ({
				...prev,
				winner: value === "" ? undefined : value === "true",
			}));
		},
		[],
	);

	return {
		moviesData: moviesPage?.content ?? [],
		isLoadingMovies,
		pageIndex: search.page,
		pageSize: LIST_PAGE_SIZE,
		totalPages: moviesPage?.totalPages ?? 0,
		onPageChange,
		yearFilter: filters.year,
		winnerFilter: filters.winner,
		onYearFilterChange,
		onWinnerFilterChange,
	};
};
