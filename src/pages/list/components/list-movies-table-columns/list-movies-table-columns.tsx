import type { ColumnDef } from "@tanstack/react-table";
import type { MovieResponse } from "@/api/generated/types";
import { HeaderButton } from "@/components/data-table/header-button";

export const ListMoviesTableColumns: ColumnDef<MovieResponse>[] = [
	{
		accessorKey: "year",
		header: ({ column }) => <HeaderButton column={column} title="Year" />,
	},
	{
		accessorKey: "title",
		header: ({ column }) => <HeaderButton column={column} title="Title" />,
	},
	{
		accessorKey: "studios",
		header: ({ column }) => <HeaderButton column={column} title="Studios" />,
		cell: ({ row }) => row.original.studios?.join(", "),
	},
	{
		accessorKey: "producers",
		header: ({ column }) => <HeaderButton column={column} title="Producers" />,
		cell: ({ row }) => row.original.producers?.join(", "),
	},
	{
		accessorKey: "winner",
		header: ({ column }) => <HeaderButton column={column} title="Winner" />,
		cell: ({ row }) => (row.original.winner ? "Yes" : "No"),
	},
];
