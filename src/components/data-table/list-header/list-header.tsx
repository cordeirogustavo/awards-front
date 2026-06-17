interface IListHeaderProps {
	title: string;
}

export function ListHeader({ title }: IListHeaderProps) {
	return (
		<div className="mt-2 flex flex-row items-center gap-4 sm:items-end sm:justify-between">
			<span className="text-2xl text-bold text-zinc-600">{title}</span>
		</div>
	);
}
