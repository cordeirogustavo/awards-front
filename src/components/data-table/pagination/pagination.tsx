import {
	CaretDoubleLeftIcon,
	CaretDoubleRightIcon,
	CaretLeftIcon,
	CaretRightIcon,
} from "@phosphor-icons/react";
import type { Table as TanstackTable } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface IPaginationProps<TData> {
	table: TanstackTable<TData>;
}

const PAGE_WINDOW_SIZE = 5;

export function Pagination<TData>({ table }: IPaginationProps<TData>) {
	const { pageIndex } = table.getState().pagination;
	const pageCount = Math.max(table.getPageCount(), 1);

	const windowSize = Math.min(PAGE_WINDOW_SIZE, pageCount);
	const windowStart = Math.max(
		0,
		Math.min(
			pageIndex - Math.floor(PAGE_WINDOW_SIZE / 2),
			pageCount - windowSize,
		),
	);
	const pageNumbers = Array.from(
		{ length: windowSize },
		(_, index) => windowStart + index,
	);

	const arrowButtonClassName =
		"flex h-8 w-8 items-center justify-center rounded-sm border border-zinc-300 text-zinc-600 disabled:cursor-not-allowed disabled:opacity-50";

	return (
		<div className="flex flex-none items-center justify-center gap-1 border-zinc-200 border-t px-2 pt-2">
			<button
				type="button"
				className={arrowButtonClassName}
				onClick={() => table.setPageIndex(0)}
				disabled={!table.getCanPreviousPage()}
			>
				<CaretDoubleLeftIcon size={16} />
			</button>
			<button
				type="button"
				className={arrowButtonClassName}
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				<CaretLeftIcon size={16} />
			</button>
			{pageNumbers.map((page) => (
				<button
					key={page}
					type="button"
					className={cn(
						"flex h-8 w-8 items-center justify-center rounded-sm border text-sm",
						page === pageIndex
							? "border-blue-500 bg-blue-500 text-white"
							: "border-zinc-300 text-zinc-600 hover:bg-zinc-100",
					)}
					onClick={() => table.setPageIndex(page)}
				>
					{page + 1}
				</button>
			))}
			<button
				type="button"
				className={arrowButtonClassName}
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				<CaretRightIcon size={16} />
			</button>
			<button
				type="button"
				className={arrowButtonClassName}
				onClick={() => table.setPageIndex(pageCount - 1)}
				disabled={!table.getCanNextPage()}
			>
				<CaretDoubleRightIcon size={16} />
			</button>
		</div>
	);
}
