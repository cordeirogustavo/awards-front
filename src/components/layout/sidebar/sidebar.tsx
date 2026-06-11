import { Link } from "@tanstack/react-router";
import type React from "react";
import { useSidebar } from "@/context";

export const Sidebar: React.FC = () => {
	const { open, handleNavigate } = useSidebar();
	const sidebarItems = [
		{
			label: "Dashboard",
			to: "/",
		},
		{
			label: "List",
			to: "/list",
		},
	];

	return (
		<aside
			className={`bg-zinc-100 w-full sm:w-80 sm:relative
    	${open ? "block" : "hidden"}
  	`}
		>
			<nav className="flex flex-col gap-1 p-2">
				{sidebarItems.map((item) => (
					<Link
						key={item.to}
						to={item.to}
						className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-zinc-200"
						activeProps={{
							className: "bg-zinc-200 text-blue-400",
						}}
						onClick={handleNavigate}
					>
						<span className="text-2xl">{item.label}</span>
					</Link>
				))}
			</nav>
		</aside>
	);
};
