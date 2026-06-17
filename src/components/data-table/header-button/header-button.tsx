interface IHeaderButtonProps {
	title: string;
}

export function HeaderButton({ title }: IHeaderButtonProps) {
	return (
		<span className="flex h-6 w-full items-center font-bold text-xs uppercase tracking-widest md:h-8">
			{title}
		</span>
	);
}
