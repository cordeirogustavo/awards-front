import { flexRender, type Header, type Row } from "@tanstack/react-table";
import type React from "react";
import type { ITableItens } from "../data-table";
import { MobileListLoading } from "./mobile-list-loading";

interface IMobileListProps<TData> {
	headers: Header<TData, unknown>[];
	contentMobileRef: React.RefObject<HTMLDivElement | null>;
	tableItems: ITableItens<TData>[];
	headersByColumnId: Map<string, Header<TData, unknown>>;
	visible: boolean;
	recordCount: number;
	isLoading?: boolean;
	loadingItems?: number;
}

function CardRowItem<TData>({
	row,
	headersByColumnId,
}: {
	id: string;
	row: Row<TData>;
	headersByColumnId: Map<string, Header<TData, unknown>>;
}) {
	const visibleCells = row.getVisibleCells();
	if (!visibleCells.length) return null;

	return (
		<div className="w-full" key={row.id}>
			<div className="relative rounded-lg border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
				{visibleCells.map((cell) => {
					const header = headersByColumnId.get(cell.column.id);
					const value = cell.getValue();

					return (
						<div key={cell.id} className="flex flex-col">
							<span className="font-medium text-zinc-500 text-sm uppercase tracking-wide">
								{header &&
									flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
							</span>

							<span
								className="block truncate text-sm text-zinc-800"
								title={typeof value === "string" ? value : undefined}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function MobileList<TData>({
	headers,
	contentMobileRef,
	tableItems,
	headersByColumnId,
	visible,
	recordCount,
	isLoading = false,
	loadingItems,
}: IMobileListProps<TData>) {
	if (!visible) return null;
	if (isLoading)
		return <MobileListLoading headers={headers} loadingItems={loadingItems} />;
	if (!recordCount) return null;
	return (
		<div
			className="flex min-h-20 w-full flex-1 flex-col overflow-auto"
			ref={contentMobileRef}
		>
			<div className="flex flex-col gap-1">
				{tableItems.map((item) => (
					<CardRowItem
						key={item.id}
						id={item.id}
						row={item.row}
						headersByColumnId={headersByColumnId}
					/>
				))}
			</div>
		</div>
	);
}
