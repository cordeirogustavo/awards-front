import { Page } from "@/components";
import { DataTable } from "@/components/data-table";
import {
	ListYearsTableColumns,
	TopThreeStudiosTableColumns,
} from "./components";
import { useDashboardPage } from "./dashboard.hooks";

export const DashboardPage: React.FC = () => {
	const {
		yearsWithMultipleWinnersData,
		studiosWithWinCountData,
		isStudiosWithWinLoading,
		isYearsWithMultipleWinnersLoading,
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
				<div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
					<DataTable
						title="List years with multiple winners"
						data={yearsWithMultipleWinnersData}
						columns={ListYearsTableColumns}
						isLoading={isYearsWithMultipleWinnersLoading}
					/>
					<DataTable
						title="Top 3 studios with winners"
						data={studiosWithWinCountData}
						columns={TopThreeStudiosTableColumns}
						isLoading={isStudiosWithWinLoading}
					/>
				</div>
			</Page.Content>
		</Page>
	);
};
