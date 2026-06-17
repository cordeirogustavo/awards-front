import { config } from "@/config/config";

export async function apiFetch<T>(
	path: string,
	params?: Record<string, unknown>,
	signal?: AbortSignal,
): Promise<T> {
	const url = new URL(`${config.apiBaseUrl}${path}`);

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value != null && value !== "") {
				url.searchParams.append(key, String(value));
			}
		}
	}

	const response = await fetch(url.toString(), { signal });

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return response.json() as Promise<T>;
}
