import {
	flexRender,
	type Row,
	type Table as TanstackTable,
} from "@tanstack/react-table";
import type React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components";
import type { ITableItens } from "../data-table";
import { DesktopListLoading } from "./desktop-list-loading";

interface IDesktopListProps<TData> {
	table: TanstackTable<TData>;
	contentRef: React.RefObject<HTMLDivElement | null>;
	tableItems: ITableItens<TData>[];
	visible: boolean;
	recordCount: number;
	isLoading?: boolean;
	loadingItems?: number;
}

function TableRowItem<TData>({ row }: { id: string; row: Row<TData> }) {
	return (
		<TableRow
			key={row.id}
			className="group odd:bg-zinc-50 transition-colors hover:bg-zinc-200"
		>
			{row.getVisibleCells().map((cell) => {
				const value = cell.getValue();

				return (
					<TableCell
						key={cell.id}
						style={{ width: cell.column.getSize() }}
						className="max-w-0 px-4 py-3 text-zinc-600 text-sm"
						title={typeof value === "string" ? value : undefined}
					>
						<span className="block truncate">
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</span>
					</TableCell>
				);
			})}
		</TableRow>
	);
}

export function DesktopList<TData>({
	table,
	contentRef,
	tableItems,
	visible,
	recordCount,
	isLoading = false,
	loadingItems,
}: IDesktopListProps<TData>) {
	if (!visible) return null;
	if (isLoading)
		return (
			<DesktopListLoading
				headers={table.getHeaderGroups()[0].headers}
				loadingItems={loadingItems}
			/>
		);
	if (!recordCount) return null;
	return (
		<div className="relative min-h-30 flex-1 overflow-auto" ref={contentRef}>
			<Table className="table-fixed border-separate border-spacing-0">
				<TableHeader className="sticky! top-0! z-10 bg-zinc-100 backdrop-blur-lg">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="border-none hover:bg-transparent"
						>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									style={{ width: header.getSize() }}
									className="relative h-12 px-4 font-bold text-zinc-600 text-xs uppercase tracking-widest"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{tableItems.map((item) => (
						<TableRowItem key={item.id} id={item.id} row={item.row} />
					))}
				</TableBody>
			</Table>
		</div>
	);
}
