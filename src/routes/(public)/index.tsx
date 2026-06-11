import { createFileRoute } from "@tanstack/react-router";
import { findYearsWithMultipleWinnersQueryOptions } from "@/api/generated";
import { DashboardPage } from "@/pages";

export const Route = createFileRoute("/(public)/")({
	loader: async ({ context }) => {
		const { queryClient } = context;
		queryClient.ensureQueryData(
			findYearsWithMultipleWinnersQueryOptions({
				skipLoading: false,
			}),
		);
		return {};
	},
	component: DashboardPage,
});
