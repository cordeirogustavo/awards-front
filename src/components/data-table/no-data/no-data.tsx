import { WarningCircleIcon } from "@phosphor-icons/react";

interface INoDataProps {
	text: string;
	visible: boolean;
}

export function NoData({ text, visible }: INoDataProps) {
	if (!visible) return null;
	return (
		<div className="flex min-h-0 flex-1 flex-col gap-4">
			<div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-800">
				<WarningCircleIcon size={40} weight="duotone" className="opacity-20" />
				<span className="font-medium text-sm">{text}</span>
			</div>
		</div>
	);
}
