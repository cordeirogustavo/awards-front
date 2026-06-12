import type { Header } from "@tanstack/react-table";
import { Skeleton } from "@/components";

interface IMobileListLoadingProps<TData> {
	headers: Header<TData, unknown>[];
	actions?: boolean;
	loadingItems?: number;
}

export function MobileListLoading<TData>({
	headers,
	actions,
	loadingItems = 10,
}: IMobileListLoadingProps<TData>) {
	const skeletonRows = Array.from(
		{ length: loadingItems },
		(_, i) => `skeleton-row-${i}`,
	);

	return (
		<div className="flex min-h-20 w-full flex-1 flex-col gap-1 overflow-auto">
			{skeletonRows.map((key) => (
				<div
					key={key}
					className="relative rounded-lg border border-zinc-200 bg-zinc-50 p-4 shadow-sm"
				>
					<div className="flex flex-col gap-3">
						{headers
							.filter((h) => h.column.id !== "actions")
							.map((header) => (
								<div key={header.id} className="flex flex-col gap-2">
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-4 w-full" />
								</div>
							))}
					</div>

					{actions && (
						<div className="absolute top-3 right-3">
							<Skeleton className="h-4 w-2" />
						</div>
					)}
				</div>
			))}
		</div>
	);
}
