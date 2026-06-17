import type { PropsWithChildren } from "react";

export const DashboardContainer: React.FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<div className="flex flex-col w-full overflow-hidden shadow-sm p-2">
			{children}
		</div>
	);
};
