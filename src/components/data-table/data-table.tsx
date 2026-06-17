import {
	type ColumnDef,
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	type Header,
	type PaginationState,
	type Row,
	type Updater,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopList } from "./desktop-list/desktop-list";
import { ListHeader } from "./list-header/list-header";
import { MobileList } from "./mobile-list/mobile-list";
import { NoData } from "./no-data/no-data";
import { Pagination } from "./pagination/pagination";
import { RecordsCount } from "./records-count/records-count";

export interface IDataTablePagination {
	pageIndex: number;
	pageSize: number;
	totalPages: number;
	onPageChange: (pageIndex: number) => void;
}

interface IDataTableProps<TData, TValue> {
	title: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchBy?: string;
	isLoading?: boolean;
	showRecordsCount?: boolean;
	pagination?: IDataTablePagination;
	loadingItems?: number;
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
	isLoading = false,
	showRecordsCount = false,
	pagination,
	loadingItems,
}: IDataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const contentMobileRef = React.useRef<HTMLDivElement>(null);
	const isMobile = useIsMobile();

	const table = useReactTable<TData>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: !!pagination,
		pageCount: pagination?.totalPages,
		onPaginationChange: pagination
			? (updater: Updater<PaginationState>) => {
					const current: PaginationState = {
						pageIndex: pagination.pageIndex,
						pageSize: pagination.pageSize,
					};
					const next =
						typeof updater === "function" ? updater(current) : updater;
					pagination.onPageChange(next.pageIndex);
				}
			: undefined,
		state: {
			columnFilters,
			...(pagination
				? {
						pagination: {
							pageIndex: pagination.pageIndex,
							pageSize: pagination.pageSize,
						},
					}
				: {}),
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
	const tableItems = React.useMemo(
		() =>
			rows.map((row) => ({
				id: row.id,
				row,
			})),
		[rows],
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
				loadingItems={loadingItems}
			/>
			<MobileList
				contentMobileRef={contentMobileRef}
				tableItems={tableItems}
				headersByColumnId={headersByColumnId}
				visible={isMobile}
				isLoading={isLoading}
				recordCount={rows.length}
				headers={table.getFlatHeaders()}
				loadingItems={loadingItems}
			/>
			{showRecordsCount && (
				<RecordsCount
					text={`${table.getFilteredRowModel().rows.length} of ${data.length} records`}
				/>
			)}
			{pagination && <Pagination table={table} />}
		</div>
	);
}
