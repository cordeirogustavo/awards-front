import {
	CaretDoubleLeftIcon,
	CaretDoubleRightIcon,
	CaretLeftIcon,
	CaretRightIcon,
} from "@phosphor-icons/react";
import type { Table as TanstackTable } from "@tanstack/react-table";

interface IPaginationProps<TData> {
	table: TanstackTable<TData>;
}

export function Pagination<TData>({ table }: IPaginationProps<TData>) {
	const { pageIndex } = table.getState().pagination;
	const pageCount = table.getPageCount();

	return (
		<div className="flex flex-none items-center justify-end gap-4 border-zinc-200 border-t px-2 pt-2">
			<span className="text-zinc-600 text-sm">
				Page {pageIndex + 1} of {Math.max(pageCount, 1)}
			</span>
			<div className="flex items-center gap-1">
				<button
					type="button"
					className="flex h-8 w-8 items-center justify-center rounded-sm border border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					<CaretDoubleLeftIcon size={16} />
				</button>
				<button
					type="button"
					className="flex h-8 w-8 items-center justify-center rounded-sm border border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<CaretLeftIcon size={16} />
				</button>
				<button
					type="button"
					className="flex h-8 w-8 items-center justify-center rounded-sm border border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<CaretRightIcon size={16} />
				</button>
				<button
					type="button"
					className="flex h-8 w-8 items-center justify-center rounded-sm border border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
					onClick={() => table.setPageIndex(pageCount - 1)}
					disabled={!table.getCanNextPage()}
				>
					<CaretDoubleRightIcon size={16} />
				</button>
			</div>
		</div>
	);
}
