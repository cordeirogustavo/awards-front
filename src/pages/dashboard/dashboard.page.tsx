import { Page } from "@/components";
import { DataTable } from "@/components/data-table";
import { ListYearsTableColumns } from "./components/list-years-table-columns";
import { useDashboardPage } from "./dashboard.hooks";

export const DashboardPage: React.FC = () => {
	const { yearsWithMultipleWinnersData, isLoading } = useDashboardPage();
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
				<DataTable
					data={yearsWithMultipleWinnersData}
					columns={ListYearsTableColumns}
					searchBy="name"
					isLoading={isLoading}
				/>
			</Page.Content>
		</Page>
	);
};
