import React from "react";
import {
	useMaxMinWinInterval,
	useStudiosWithWinCount,
	useWinnersByYear,
	useYearsWithMultipleWinners,
} from "@/api/hooks";
import type {
	MovieResponse,
	ProducerWithInterval,
	StudioCountPerWin,
	YearWithMultipleWinners,
} from "@/api/types";
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
	} = useYearsWithMultipleWinners();

	const { data: studiosWithWinCount, isLoading: isStudiosWithWinLoading } =
		useStudiosWithWinCount();

	const { data: maxMinProducers, isLoading: isMaxMinProducersLoading } =
		useMaxMinWinInterval();

	const { data: winnersByYearData, isLoading: isLoadingWinnersByYear } =
		useWinnersByYear(
			{ year: yearToSearch || 0 },
			{ query: { enabled: yearToSearch !== undefined } },
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
