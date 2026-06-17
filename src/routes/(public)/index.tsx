import { createFileRoute } from "@tanstack/react-router";
import { yearsWithMultipleWinnersQueryOptions } from "@/api/hooks";
import { DashboardPage } from "@/pages";

export const Route = createFileRoute("/(public)/")({
	loader: async ({ context }) => {
		const { queryClient } = context;
		queryClient.ensureQueryData(yearsWithMultipleWinnersQueryOptions());
		return {};
	},
	component: DashboardPage,
});
