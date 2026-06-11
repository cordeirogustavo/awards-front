import React from "react";
import {
	useFindYearsWithMultipleWinners,
	type YearWithMultipleWinners,
} from "@/api/generated";

export interface IDashboardHooks {
	yearsWithMultipleWinnersData: YearWithMultipleWinners[];
	isLoading: boolean;
}

export const useDashboardPage = (): IDashboardHooks => {
	const { data, isLoading } = useFindYearsWithMultipleWinners({
		client: { skipLoading: true },
	});
	const yearsWithMultipleWinnersData = React.useMemo(
		() => data?.years ?? [],
		[data],
	);

	return {
		yearsWithMultipleWinnersData,
		isLoading,
	};
};
