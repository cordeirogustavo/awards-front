import type { ColumnDef } from "@tanstack/react-table";
import type { ProducerWithInterval } from "@/api/generated/types";
import { HeaderButton } from "@/components/data-table/header-button";

export const ProducersWithIntervalsTableColumns: ColumnDef<ProducerWithInterval>[] =
	[
		{
			accessorKey: "producer",
			header: ({ column }) => <HeaderButton column={column} title="Producer" />,
		},
		{
			accessorKey: "interval",
			header: ({ column }) => <HeaderButton column={column} title="Interval" />,
		},
		{
			accessorKey: "previousWin",
			header: ({ column }) => (
				<HeaderButton column={column} title="Previous Year" />
			),
		},
		{
			accessorKey: "followingWin",
			header: ({ column }) => (
				<HeaderButton column={column} title="Following Year" />
			),
		},
	];
