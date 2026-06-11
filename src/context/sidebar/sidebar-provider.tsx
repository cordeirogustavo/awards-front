import React, { type PropsWithChildren } from "react";
import { useIsMobile } from "@/hooks";

import { SidebarContext, type SidebarContextProps } from "./sidebar-context";

export function SidebarProvider({ children }: PropsWithChildren) {
	const isMobile = useIsMobile();
	const [open, setOpen] = React.useState(true);

	React.useEffect(() => {
		if (isMobile) {
			setOpen(false);
			return;
		}
		setOpen(true);
	}, [isMobile]);

	const toggleSidebar = React.useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	const handleNavigate = React.useCallback(() => {
		if (window.innerWidth < 640) {
			setOpen(false);
		}
	}, []);

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({ open, toggleSidebar, handleNavigate }),
		[open, toggleSidebar, handleNavigate],
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			{children}
		</SidebarContext.Provider>
	);
}
