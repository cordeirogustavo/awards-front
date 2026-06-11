import "../styles.css";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Content } from "@/components";

interface IRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<Content>
			<Outlet />
		</Content>
	);
}
