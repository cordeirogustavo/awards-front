import { Page } from "@/components";
import { DataTable } from "@/components/data-table";
import { ListMoviesTableColumns } from "./components";
import { useListPage } from "./list.hooks";
import { LIST_PAGE_SIZE } from "./list.schemas";

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
						columns={ListMoviesTableColumns}
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
