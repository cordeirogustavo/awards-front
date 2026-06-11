import type { Table as TanstackTable } from "@tanstack/react-table";

interface IListHeaderProps<TData> {
	table: TanstackTable<TData>;
	searchText: string;
	searchBy?: string;
}

export function ListHeader<TData>({
	table,
	searchText,
	searchBy,
}: IListHeaderProps<TData>) {
	return (
		<div className="mt-0 flex flex-row items-center gap-4 sm:mt-8 sm:items-end sm:justify-end">
			{searchBy && (
				<div className="relative w-full sm:max-w-sm">
					<input
						type="text"
						placeholder={searchText}
						value={
							(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table.getColumn(searchBy)?.setFilterValue(event.target.value)
						}
					/>
				</div>
			)}
		</div>
	);
}
