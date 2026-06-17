import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { ColumnDef } from "@tanstack/react-table";
import type {
	MovieResponse,
	ProducerWithInterval,
	StudioCountPerWin,
	YearWithMultipleWinners,
} from "@/api/types";
import {
	DashboardContainer,
	DataTable,
	HeaderButton,
	Page,
} from "@/components";
import { useDashboardPage } from "./dashboard.hooks";

const listYearsColumns: ColumnDef<YearWithMultipleWinners>[] = [
	{
		accessorKey: "year",
		header: () => <HeaderButton title="Year" />,
	},
	{
		accessorKey: "winnerCount",
		header: () => <HeaderButton title="Win Count" />,
	},
];

const topStudiosColumns: ColumnDef<StudioCountPerWin>[] = [
	{
		accessorKey: "name",
		header: () => <HeaderButton title="Name" />,
	},
	{
		accessorKey: "winCount",
		header: () => <HeaderButton title="Win Count" />,
	},
];

const producersIntervalColumns: ColumnDef<ProducerWithInterval>[] = [
	{
		accessorKey: "producer",
		header: () => <HeaderButton title="Producer" />,
	},
	{
		accessorKey: "interval",
		header: () => <HeaderButton title="Interval" />,
	},
	{
		accessorKey: "previousWin",
		header: () => <HeaderButton title="Previous Year" />,
	},
	{
		accessorKey: "followingWin",
		header: () => <HeaderButton title="Following Year" />,
	},
];

const movieWinnerColumns: ColumnDef<MovieResponse>[] = [
	{
		accessorKey: "id",
		header: () => <HeaderButton title="Id" />,
	},
	{
		accessorKey: "year",
		header: () => <HeaderButton title="Year" />,
	},
	{
		accessorKey: "title",
		header: () => <HeaderButton title="Title" />,
	},
];

export const DashboardPage: React.FC = () => {
	const {
		yearsWithMultipleWinnersData,
		studiosWithWinCountData,
		maxIntervalProducersData,
		minIntervalProducersData,
		winnersByYearData,
		isStudiosWithWinLoading,
		isYearsWithMultipleWinnersLoading,
		isMaxMinProducersLoading,
		isLoadingWinnersByYear,
		searchByYearInput,
		handleSearchByYear,
	} = useDashboardPage();
	return (
		<Page>
			<Page.Header>
				<Page.Header.Content>
					<Page.Title>Dashboard</Page.Title>
					<Page.Description>
						Dashboard page with some analytics
					</Page.Description>
				</Page.Header.Content>
			</Page.Header>
			<Page.Content>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<DashboardContainer>
						<DataTable
							title="List years with multiple winners"
							data={yearsWithMultipleWinnersData}
							columns={listYearsColumns}
							isLoading={isYearsWithMultipleWinnersLoading}
							loadingItems={3}
						/>
					</DashboardContainer>
					<DashboardContainer>
						<DataTable
							title="Top 3 studios with winners"
							data={studiosWithWinCountData}
							columns={topStudiosColumns}
							isLoading={isStudiosWithWinLoading}
							loadingItems={3}
						/>
					</DashboardContainer>
					<DashboardContainer>
						<span className="text-2xl text-bold text-zinc-600">
							Producers with longest and shortest interval between wins
						</span>
						<DataTable
							title="Maximum"
							data={maxIntervalProducersData}
							columns={producersIntervalColumns}
							isLoading={isMaxMinProducersLoading}
							loadingItems={1}
						/>
						<DataTable
							title="Minimum"
							data={minIntervalProducersData}
							columns={producersIntervalColumns}
							isLoading={isMaxMinProducersLoading}
							loadingItems={1}
						/>
					</DashboardContainer>
					<DashboardContainer>
						<span className="text-2xl text-bold text-zinc-600">
							List movie winners by year
						</span>
						<div className="flex flex-row w-full justify-between gap-2">
							<input
								className="w-full border border-zinc-300 p-2 rounded-sm"
								type="number"
								ref={searchByYearInput}
								placeholder="Search by year"
							/>
							<button
								type="button"
								className="p-4 bg-blue-500 cursor-pointer"
								onClick={handleSearchByYear}
							>
								<MagnifyingGlassIcon
									className="h-4 w-4 text-white"
									weight="duotone"
								/>
							</button>
						</div>
						<DataTable
							title=""
							data={winnersByYearData}
							columns={movieWinnerColumns}
							isLoading={isLoadingWinnersByYear}
							loadingItems={5}
						/>
					</DashboardContainer>
				</div>
			</Page.Content>
		</Page>
	);
};
