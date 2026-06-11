interface IRecordsCountProps {
	text: string;
}
export function RecordsCount({ text }: IRecordsCountProps) {
	return (
		<div className="flex flex-none items-center justify-between border-zinc-200 border-t px-2 pt-2">
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 animate-pulse rounded-full bg-zinc-800" />
				<p className="font-medium text-zinc-600 text-sm">{text}</p>
			</div>
			<div className="flex items-center gap-6 lg:gap-8"></div>
		</div>
	);
}
