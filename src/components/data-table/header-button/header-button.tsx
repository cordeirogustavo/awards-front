import { ArrowsDownUpIcon } from "@phosphor-icons/react";
import type { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface IHeaderButtonProps<TData, TValue> {
	column: Column<TData, TValue>;
	title: string;
}

export function HeaderButton<TData, TValue>({
	column,
	title,
}: IHeaderButtonProps<TData, TValue>) {
	return (
		<button
			type="button"
			onClick={() => column.toggleSorting()}
			className="flex h-6 w-full items-center justify-between px-0 font-bold text-xs uppercase tracking-widest hover:bg-transparent md:h-8"
		>
			{title}
			<ArrowsDownUpIcon
				size={18}
				weight={column.getIsSorted() ? "bold" : "regular"}
				className={cn(
					"hidden md:block",
					column.getIsSorted() ? "text-zinc-500" : "text-zinc-400",
				)}
			/>
		</button>
	);
}
