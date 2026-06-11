import { SpinnerGapIcon } from "@phosphor-icons/react";
import type React from "react";

export const Loading: React.FC = () => {
	return (
		<div
			id="loading"
			className="pointer-events-auto fixed inset-0 z-999 hidden overflow-y-auto bg-black/80"
		>
			<div className="flex min-h-screen flex-col items-center justify-center px-4 pt-4 pb-20 text-center">
				<SpinnerGapIcon className="h-28 w-28 animate-spin" />
				<p className="mt-8 text-center font-semibold text-2xl text-white">
					Carregando ...
				</p>
			</div>
		</div>
	);
};
