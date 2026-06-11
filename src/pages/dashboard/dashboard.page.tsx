import { Page } from "@/components";

export const DashboardPage: React.FC = () => {
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
				<p></p>
			</Page.Content>
		</Page>
	);
};
