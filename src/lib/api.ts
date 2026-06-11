import { QueryClient } from "@tanstack/react-query";

const EXPIRES_CACHE_5_MINUTES = 5 * 60 * 1000;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			staleTime: EXPIRES_CACHE_5_MINUTES,
		},
		mutations: {
			retry: 0,
		},
	},
});
