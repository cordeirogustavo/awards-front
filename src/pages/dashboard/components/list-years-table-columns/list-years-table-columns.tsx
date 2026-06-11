import type { ColumnDef } from "@tanstack/react-table";
import type { YearWithMultipleWinners } from "@/api/generated/types/YearWithMultipleWinners";
import { HeaderButton } from "@/components/data-table/header-button";

export const ListYearsTableColumns: ColumnDef<YearWithMultipleWinners>[] = [
	{
		accessorKey: "year",
		header: ({ column }) => <HeaderButton column={column} title="Year" />,
	},
	{
		accessorKey: "winnerCount",
		header: ({ column }) => <HeaderButton column={column} title="Win Count" />,
	},
];
