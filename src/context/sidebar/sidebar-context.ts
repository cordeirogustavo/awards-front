import React from "react";

export type SidebarContextProps = {
	open: boolean;
	toggleSidebar: () => void;
};

export const SidebarContext = React.createContext<SidebarContextProps | null>(
	null,
);

export const useSidebar = () => {
	const context = React.useContext(SidebarContext);

	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}

	return context;
};
