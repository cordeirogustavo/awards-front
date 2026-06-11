import "../styles.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Content } from "@/components";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<Content>
			<Outlet />
		</Content>
	);
}
