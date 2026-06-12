import type { ColumnDef } from "@tanstack/react-table";
import type { MovieResponse } from "@/api/generated/types";
import { HeaderButton } from "@/components/data-table/header-button";

export const ListMovieWinnerTableColumn: ColumnDef<MovieResponse>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => <HeaderButton column={column} title="Id" />,
	},
	{
		accessorKey: "year",
		header: ({ column }) => <HeaderButton column={column} title="Year" />,
	},
	{
		accessorKey: "title",
		header: ({ column }) => <HeaderButton column={column} title="Title" />,
	},
];
