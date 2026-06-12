import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { DashboardContainer, Page } from "@/components";
import { DataTable } from "@/components/data-table";
import {
	ListMovieWinnerTableColumn,
	ListYearsTableColumns,
	ProducersWithIntervalsTableColumns,
	TopThreeStudiosTableColumns,
} from "./components";
import { useDashboardPage } from "./dashboard.hooks";

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
							columns={ListYearsTableColumns}
							isLoading={isYearsWithMultipleWinnersLoading}
						/>
					</DashboardContainer>
					<DashboardContainer>
						<DataTable
							title="Top 3 studios with winners"
							data={studiosWithWinCountData}
							columns={TopThreeStudiosTableColumns}
							isLoading={isStudiosWithWinLoading}
						/>
					</DashboardContainer>
					<DashboardContainer>
						<span className="text-2xl text-bold text-zinc-600">
							Producers with longest and shortest interval between wins
						</span>
						<DataTable
							title="Maximum"
							data={maxIntervalProducersData}
							columns={ProducersWithIntervalsTableColumns}
							isLoading={isMaxMinProducersLoading}
						/>
						<DataTable
							title="Minimum"
							data={minIntervalProducersData}
							columns={ProducersWithIntervalsTableColumns}
							isLoading={isMaxMinProducersLoading}
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
							columns={ListMovieWinnerTableColumn}
							isLoading={isLoadingWinnersByYear}
						/>
					</DashboardContainer>
				</div>
			</Page.Content>
		</Page>
	);
};
