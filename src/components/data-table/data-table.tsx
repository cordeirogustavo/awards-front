import {
	type ColumnDef,
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type Header,
	type Row,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopList } from "./desktop-list";
import { ListHeader } from "./list-header";
import { MobileList } from "./mobile-list";
import { NoData } from "./no-data";
import { RecordsCount } from "./records-count";
import {
	type IDataTableRowAction,
	RowActions,
} from "./row-actions/row-actions";

interface IDataTableProps<TData, TValue> {
	title: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchBy?: string;
	actions?: IDataTableRowAction<TData>[];
	isLoading?: boolean;
}

export interface ITableItens<TData> {
	id: string;
	row: Row<TData>;
}

export function DataTable<TData, TValue>({
	title,
	columns,
	data,
	searchBy,
	actions,
	isLoading = false,
}: IDataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const contentRef = React.useRef<HTMLDivElement>(null);
	const contentMobileRef = React.useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();

	const actionsColumn = React.useMemo<ColumnDef<TData> | null>(() => {
		if (!actions) return null;
		return {
			id: "actions",
			header: () => "Actions",
			enableSorting: false,
			enableHiding: false,
			size: 12,
			minSize: 12,
			maxSize: 12,
			meta: {
				isActions: true,
			},
			cell: ({ row }) => (
				<RowActions row={row.original} rowId={row.id} actions={actions} />
			),
		};
	}, [actions]);

	const finalColumns = React.useMemo(() => {
		if (!actionsColumn) return columns;
		return [...columns, actionsColumn];
	}, [columns, actionsColumn]);

	const table = useReactTable<TData>({
		data,
		columns: finalColumns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		enableColumnResizing: true,
		columnResizeMode: "onEnd",
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	const headersByColumnId = React.useMemo(() => {
		const map = new Map<string, Header<TData, unknown>>();
		table.getFlatHeaders().forEach((header) => {
			map.set(header.column.id, header);
		});
		return map;
	}, [table]);

	const rows = table.getRowModel().rows;
	// biome-ignore lint/correctness/useExhaustiveDependencies: <this dep is necessary to update render when columnVisibility change>
	const tableItems = React.useMemo(
		() =>
			rows.map((row) => ({
				id: row.id,
				row,
			})),
		[rows, columnVisibility],
	);

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-4">
			<ListHeader
				title={title}
				table={table}
				searchText="Search"
				searchBy={searchBy}
			/>
			<NoData
				text="No results found."
				visible={!table.getRowModel().rows?.length && !isLoading}
			/>
			<DesktopList
				table={table}
				contentRef={contentRef}
				tableItems={tableItems}
				visible={!isMobile}
				recordCount={rows.length}
				isLoading={isLoading}
			/>
			<MobileList
				contentMobileRef={contentMobileRef}
				tableItems={tableItems}
				headersByColumnId={headersByColumnId}
				visible={isMobile}
				isLoading={isLoading}
				recordCount={rows.length}
				headers={table.getFlatHeaders()}
			/>
			<RecordsCount
				text={`${table.getFilteredRowModel().rows.length} of ${data.length} records`}
			/>
		</div>
	);
}
