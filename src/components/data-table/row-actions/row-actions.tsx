import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { Link, type LinkProps } from "@tanstack/react-router";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components";

export type IDataTableRowAction<TData> =
	| {
			label: string;
			icon?: React.ReactNode;
			onClick: (row: TData) => void;
			variant?: "default" | "destructive";
			hidden?: (row: TData) => boolean;
			disabled?: (row: TData) => boolean;
	  }
	| {
			label: string;
			icon?: React.ReactNode;
			variant?: "default" | "destructive";
			hidden?: (row: TData) => boolean;
			disabled?: (row: TData) => boolean;
			link: (row: TData) => LinkProps;
	  };

export function RowActions<TData>({
	row,
	rowId,
	actions,
}: {
	row: TData;
	rowId: string;
	actions: IDataTableRowAction<TData>[];
}) {
	const visibleActions = actions.filter((a) => !a.hidden?.(row));

	if (!visibleActions.length) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="flex w-full justify-end">
				<button
					type="button"
					className="h-auto w-full p-0 hover:bg-transparent"
				>
					<DotsThreeVerticalIcon
						size={20}
						weight="bold"
						className="text-zinc-600"
					/>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="flex w-full flex-col gap-2 p-2"
			>
				{visibleActions.map((action, index) => {
					const key = `${rowId}-${action.label}-${index}`;
					if ("link" in action) {
						const linkProps = action.link(row);
						return (
							<DropdownMenuItem
								key={key}
								className="flex items-center gap-2 text-md"
								asChild
							>
								<Link {...linkProps}>
									{action.icon}
									{action.label}
								</Link>
							</DropdownMenuItem>
						);
					}
					return (
						<DropdownMenuItem
							key={key}
							onClick={() => action.onClick(row)}
							className="flex items-center gap-2 text-md"
						>
							{action.icon}
							{action.label}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
