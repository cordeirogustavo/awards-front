import type { ColumnDef } from "@tanstack/react-table";
import type { MovieResponse } from "@/api/generated/types";
import { HeaderButton } from "@/components/data-table/header-button";

export const ListMoviesTableColumns: ColumnDef<MovieResponse>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => <HeaderButton column={column} title="ID" />,
		size: 60,
	},
	{
		accessorKey: "year",
		header: ({ column }) => <HeaderButton column={column} title="Year" />,
		size: 80,
	},
	{
		accessorKey: "title",
		header: ({ column }) => <HeaderButton column={column} title="Title" />,
	},
	{
		accessorKey: "winner",
		header: ({ column }) => <HeaderButton column={column} title="Winner" />,
		cell: ({ row }) => (row.original.winner ? "Yes" : "No"),
		size: 80,
	},
];
