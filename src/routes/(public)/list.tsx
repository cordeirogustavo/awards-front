import { createFileRoute } from "@tanstack/react-router";
import { ListPage } from "@/pages";

export const Route = createFileRoute("/(public)/list")({
	component: ListPage,
});
