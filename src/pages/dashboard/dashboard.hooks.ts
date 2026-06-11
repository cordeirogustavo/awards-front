import React from "react";
import {
	type ProducerWithInterval,
	type StudioCountPerWin,
	useFindMaxMinWinIntervalForProducers,
	useFindStudiosWithWinCount,
	useFindYearsWithMultipleWinners,
	type YearWithMultipleWinners,
} from "@/api/generated";

export interface IDashboardHooks {
	yearsWithMultipleWinnersData: YearWithMultipleWinners[];
	studiosWithWinCountData: StudioCountPerWin[];
	maxIntervalProducersData: ProducerWithInterval[];
	minIntervalProducersData: ProducerWithInterval[];
	isYearsWithMultipleWinnersLoading: boolean;
	isStudiosWithWinLoading: boolean;
	isMaxMinProducersLoading: boolean;
}

export const useDashboardPage = (): IDashboardHooks => {
	const {
		data: yearsWithMultipleWinners,
		isLoading: isYearsWithMultipleWinnersLoading,
	} = useFindYearsWithMultipleWinners({
		client: { skipLoading: true },
	});

	const { data: studiosWithWinCount, isLoading: isStudiosWithWinLoading } =
		useFindStudiosWithWinCount({
			client: { skipLoading: true },
		});

	const { data: maxMinProducers, isLoading: isMaxMinProducersLoading } =
		useFindMaxMinWinIntervalForProducers({
			client: { skipLoading: true },
		});

	const topStudios = React.useMemo(() => {
		const studios = studiosWithWinCount?.studios ?? [];
		return [...studios]
			.sort((a, b) => (b?.winCount ?? 0) - (a?.winCount ?? 0))
			.slice(0, 3);
	}, [studiosWithWinCount?.studios]);

	return {
		yearsWithMultipleWinnersData: yearsWithMultipleWinners?.years ?? [],
		studiosWithWinCountData: topStudios,
		maxIntervalProducersData: maxMinProducers?.max ?? [],
		minIntervalProducersData: maxMinProducers?.min ?? [],
		isYearsWithMultipleWinnersLoading,
		isStudiosWithWinLoading,
		isMaxMinProducersLoading,
	};
};
