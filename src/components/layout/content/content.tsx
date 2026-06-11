import type { PropsWithChildren } from "react";
import { Header, Sidebar } from "@/components";
import { SidebarProvider } from "@/context";

export function Content({ children }: PropsWithChildren) {
	return (
		<div className="flex h-screen w-full flex-col">
			<SidebarProvider>
				<Header />
				<div className="flex min-h-0 flex-1">
					<Sidebar />
					<div className="flex min-h-0 w-full flex-1 flex-col overflow-auto">
						<div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
							<main className="flex min-h-0 flex-1 flex-col p-4">
								{children}
							</main>
						</div>
					</div>
				</div>
			</SidebarProvider>
		</div>
	);
}
