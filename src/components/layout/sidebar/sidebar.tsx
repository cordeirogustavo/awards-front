import { Link } from "@tanstack/react-router";
import type React from "react";
import { useSidebar } from "@/context";

export const Sidebar: React.FC = () => {
	const { open } = useSidebar();
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
			className={`
				bg-zinc-100 transition-transform duration-100 ease-in-out w-full sm:w-80
   			${open ? "translate-x-0" : "-translate-x-full"}
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
					>
						<span className="text-2xl">{item.label}</span>
					</Link>
				))}
			</nav>
		</aside>
	);
};
