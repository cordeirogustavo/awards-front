import { createFileRoute } from "@tanstack/react-router";
import { moviesQueryOptions } from "@/api/hooks";
import { ListPage } from "@/pages";
import { LIST_PAGE_SIZE, listSearchSchema } from "@/pages/list/list.schemas";

export const Route = createFileRoute("/(public)/list")({
	validateSearch: listSearchSchema,
	loaderDeps: ({ search }) => ({
		page: search.page,
		year: search.year,
		winner: search.winner,
	}),
	loader: async ({ context, deps }) => {
		const { queryClient } = context;
		queryClient.ensureQueryData(
			moviesQueryOptions({
				page: deps.page,
				size: LIST_PAGE_SIZE,
				year: deps.year,
				winner: deps.winner,
			}),
		);
		return {};
	},
	component: ListPage,
});
