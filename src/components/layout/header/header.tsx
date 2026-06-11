import { ListIcon } from "@phosphor-icons/react";
import type React from "react";
import { config } from "@/config/config";
import { useSidebar } from "@/context";

export const Header: React.FC = () => {
	const { toggleSidebar } = useSidebar();
	return (
		<header className="sticky top-0 z-30 flex h-20 items-center gap-4 px-4 shadow-sm md:px-6 bg-zinc-800">
			<nav className="flex w-full flex-row items-center justify-center gap-2 font-medium text-lg md:gap-5 md:text-sm lg:gap-6">
				<div className="mx-auto flex w-full flex-row">
					<div className="flex w-58 items-center gap-4">
						<ListIcon
							size={32}
							weight="duotone"
							className="cursor-pointer text-white"
							onClick={toggleSidebar}
						/>
						<span className="text-xl text-white">{config.appName}</span>
					</div>
				</div>
			</nav>
		</header>
	);
};
