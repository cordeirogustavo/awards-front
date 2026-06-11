import type { ColumnDef } from "@tanstack/react-table";
import type { StudioCountPerWin } from "@/api/generated/types";
import { HeaderButton } from "@/components/data-table/header-button";

export const TopThreeStudiosTableColumns: ColumnDef<StudioCountPerWin>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => <HeaderButton column={column} title="Year" />,
	},
	{
		accessorKey: "winCount",
		header: ({ column }) => <HeaderButton column={column} title="Win Count" />,
	},
];
