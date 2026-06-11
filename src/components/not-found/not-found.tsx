import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { Feedback } from "@/components";

export function NotFoundComponent() {
	const router = useRouter();

	return (
		<Feedback>
			<Feedback.Content>
				<Feedback.Icon variant="default">
					<MagnifyingGlassIcon
						className="h-10 w-10 text-zinc-400"
						weight="duotone"
					/>
				</Feedback.Icon>
				<Feedback.Body>
					<Feedback.Title>Page not found</Feedback.Title>
					<Feedback.Description>
						We couldn't find the page you're looking for. Please check the URL
						or click the button below to go back.
					</Feedback.Description>
				</Feedback.Body>
				<Feedback.Actions>
					<button
						type="button"
						className="w-full text-white bg-zinc-700 rounded-sm h-8 cursor-pointer"
						onClick={() => router.history.back()}
					>
						Back
					</button>
				</Feedback.Actions>
			</Feedback.Content>
		</Feedback>
	);
}
