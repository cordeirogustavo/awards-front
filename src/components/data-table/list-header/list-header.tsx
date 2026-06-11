import type { Table as TanstackTable } from "@tanstack/react-table";

interface IListHeaderProps<TData> {
	title: string;
	table: TanstackTable<TData>;
	searchText: string;
	searchBy?: string;
}

export function ListHeader<TData>({
	title,
	table,
	searchText,
	searchBy,
}: IListHeaderProps<TData>) {
	return (
		<div className="mt-2 flex flex-row items-center gap-4 sm:items-end sm:justify-between">
			<span className="text-2xl text-bold text-zinc-600">{title}</span>
			{searchBy && (
				<div className="relative w-full sm:max-w-sm">
					<input
						className="w-full border border-zinc-300 p-2 rounded-sm"
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
