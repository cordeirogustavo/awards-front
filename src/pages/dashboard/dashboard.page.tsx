import { Page } from "@/components";
import { DataTable } from "@/components/data-table";
import {
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
		isStudiosWithWinLoading,
		isYearsWithMultipleWinnersLoading,
		isMaxMinProducersLoading,
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
					<div className="shadow-sm p-2">
						<DataTable
							title="List years with multiple winners"
							data={yearsWithMultipleWinnersData}
							columns={ListYearsTableColumns}
							isLoading={isYearsWithMultipleWinnersLoading}
						/>
					</div>
					<div className="shadow-sm p-2">
						<DataTable
							title="Top 3 studios with winners"
							data={studiosWithWinCountData}
							columns={TopThreeStudiosTableColumns}
							isLoading={isStudiosWithWinLoading}
						/>
					</div>
					<div className="shadow-sm p-2">
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
					</div>
				</div>
			</Page.Content>
		</Page>
	);
};
