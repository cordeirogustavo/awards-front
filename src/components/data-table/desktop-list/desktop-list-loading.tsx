import type { Header } from "@tanstack/react-table";
import {
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components";

interface IDesktopListLoadingProps<TData> {
	headers: Header<TData, unknown>[];
}

export function DesktopListLoading<TData>({
	headers,
}: IDesktopListLoadingProps<TData>) {
	const rows = 30;
	const skeletonRows = Array.from(
		{ length: rows },
		(_, i) => `skeleton-row-${i}`,
	);
	return (
		<div className="relative min-h-50 flex-1 overflow-auto">
			<Table className="w-full table-fixed border-collapse">
				<TableHeader className="sticky top-0 z-10 bg-zinc-100 backdrop-blur-lg">
					<TableRow className="hover:bg-transparent">
						{headers.map((header) => (
							<TableHead
								key={header.id}
								style={{ width: header.getSize() }}
								className="relative h-12 px-4"
							>
								<Skeleton className="h-3 w-24" />
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{skeletonRows.map((key) => (
						<TableRow key={key} className="hover:bg-transparent">
							{headers.map((header) => (
								<TableCell
									key={header.id}
									style={{ width: header.getSize() }}
									className="px-4 py-3"
								>
									<Skeleton className="h-4 w-full" />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
