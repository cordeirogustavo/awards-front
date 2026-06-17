import React from "react";
import {
	type MovieResponse,
	type ProducerWithInterval,
	type StudioCountPerWin,
	useFindMaxMinWinIntervalForProducers,
	useFindStudiosWithWinCount,
	useFindWinnersByYear,
	useFindYearsWithMultipleWinners,
	type YearWithMultipleWinners,
} from "@/api/generated";
import { searchByYearSchema } from "./dashboard.schemas";

export interface IDashboardHooks {
	yearsWithMultipleWinnersData: YearWithMultipleWinners[];
	studiosWithWinCountData: StudioCountPerWin[];
	maxIntervalProducersData: ProducerWithInterval[];
	minIntervalProducersData: ProducerWithInterval[];
	winnersByYearData: MovieResponse[];
	isYearsWithMultipleWinnersLoading: boolean;
	isStudiosWithWinLoading: boolean;
	isMaxMinProducersLoading: boolean;
	isLoadingWinnersByYear: boolean;
	searchByYearInput: React.RefObject<HTMLInputElement | null>;
	handleSearchByYear: () => void;
}

export const useDashboardPage = (): IDashboardHooks => {
	const [yearToSearch, setYearToSearch] = React.useState<number>();
	const searchByYearInput = React.useRef<HTMLInputElement>(null);

	const {
		data: yearsWithMultipleWinners,
		isLoading: isYearsWithMultipleWinnersLoading,
	} = useFindYearsWithMultipleWinners();

	const { data: studiosWithWinCount, isLoading: isStudiosWithWinLoading } =
		useFindStudiosWithWinCount();

	const { data: maxMinProducers, isLoading: isMaxMinProducersLoading } =
		useFindMaxMinWinIntervalForProducers();

	const { data: winnersByYearData, isLoading: isLoadingWinnersByYear } =
		useFindWinnersByYear(
			{ year: yearToSearch || 0 },
			{
				query: {
					enabled: yearToSearch !== null,
				},
			},
		);

	const topStudios = React.useMemo(() => {
		const studios = studiosWithWinCount?.studios ?? [];
		return [...studios]
			.sort((a, b) => (b?.winCount ?? 0) - (a?.winCount ?? 0))
			.slice(0, 3);
	}, [studiosWithWinCount?.studios]);

	const handleSearchByYear = React.useCallback(() => {
		const parsed = searchByYearSchema.safeParse({
			year: searchByYearInput.current?.value,
		});
		if (!parsed.success) {
			searchByYearInput.current?.setCustomValidity(
				parsed.error.issues.map((issue) => issue.message).join(", "),
			);
			searchByYearInput.current?.reportValidity();
			return;
		}
		searchByYearInput.current?.setCustomValidity("");
		setYearToSearch(parsed.data.year);
	}, []);

	return {
		yearsWithMultipleWinnersData: yearsWithMultipleWinners?.years ?? [],
		studiosWithWinCountData: topStudios,
		maxIntervalProducersData: maxMinProducers?.max ?? [],
		minIntervalProducersData: maxMinProducers?.min ?? [],
		isYearsWithMultipleWinnersLoading,
		isStudiosWithWinLoading,
		isMaxMinProducersLoading,
		winnersByYearData: winnersByYearData ?? [],
		isLoadingWinnersByYear,
		searchByYearInput,
		handleSearchByYear,
	};
};
