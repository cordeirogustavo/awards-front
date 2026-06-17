import type { ColumnDef } from "@tanstack/react-table";
import type { MovieResponse } from "@/api/generated/types";
import { Page } from "@/components";
import { DataTable } from "@/components/data-table";
import { HeaderButton } from "@/components/data-table/header-button";
import { useListPage } from "./list.hooks";
import { LIST_PAGE_SIZE } from "./list.schemas";

const listMoviesColumns: ColumnDef<MovieResponse>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => <HeaderButton column={column} title="ID" />,
		size: 60,
	},
	{
		accessorKey: "year",
		header: ({ column }) => <HeaderButton column={column} title="Year" />,
		size: 80,
	},
	{
		accessorKey: "title",
		header: ({ column }) => <HeaderButton column={column} title="Title" />,
	},
	{
		accessorKey: "winner",
		header: ({ column }) => <HeaderButton column={column} title="Winner" />,
		cell: ({ row }) => (row.original.winner ? "Yes" : "No"),
		size: 80,
	},
];

export const ListPage: React.FC = () => {
	const {
		moviesData,
		isLoadingMovies,
		pageIndex,
		pageSize,
		totalPages,
		onPageChange,
		yearFilter,
		winnerFilter,
		onYearFilterChange,
		onWinnerFilterChange,
	} = useListPage();

	return (
		<Page>
			<Page.Header>
				<Page.Header.Content>
					<Page.Title>List</Page.Title>
					<Page.Description>
						Movies list page, you can filter by year and also by winning or
						non-winning movies
					</Page.Description>
				</Page.Header.Content>
			</Page.Header>
			<Page.Content>
				<div className="flex flex-col flex-1 min-h-0 shadow-sm p-2 gap-4">
					<div className="flex flex-col sm:flex-row w-full justify-between gap-2">
						<div className="flex flex-col gap-2 w-full">
							<span>Year</span>
							<input
								className="w-full border border-zinc-300 p-2 rounded-sm"
								type="number"
								defaultValue={yearFilter ?? ""}
								placeholder="Filter by year"
								onChange={onYearFilterChange}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<span>Winner?</span>
							<select
								className="w-full border border-zinc-300 p-2.5 rounded-sm"
								defaultValue={
									winnerFilter === undefined ? "" : String(winnerFilter)
								}
								onChange={onWinnerFilterChange}
							>
								<option value="">Yes/No</option>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
						</div>
					</div>
					<DataTable
						title="List movies"
						data={moviesData}
						columns={listMoviesColumns}
						isLoading={isLoadingMovies}
						pagination={{
							pageIndex,
							pageSize,
							totalPages,
							onPageChange,
						}}
						loadingItems={LIST_PAGE_SIZE}
					/>
				</div>
			</Page.Content>
		</Page>
	);
};
