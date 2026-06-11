import { config } from "@/config/config";

interface CustomFetchOptions extends RequestInit {
	skipLoading?: boolean;
	params?: Record<string, string | number | boolean>;
}

type FetchResponse<T> = T;

export class CustomFetchError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export interface RequestConfig<TData = unknown> {
	url?: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	params?: Record<string, string | number | boolean>;
	data?: TData | FormData;
	headers?: HeadersInit;
	signal?: AbortSignal;
	skipLoading?: boolean;
}

export interface ResponseConfig<TData = unknown> {
	data: TData;
	status: number;
	statusText: string;
}

export interface ResponseErrorConfig<TError = unknown> {
	status: number;
	message: string;
	data?: TError;
}

export const client = async <
	TData = unknown,
	_TError = unknown,
	TVariables = unknown,
>(
	config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
	try {
		const {
			url = "",
			method = "GET",
			data,
			params,
			headers,
			signal,
			skipLoading,
		} = config;

		const response = await customFetch<TData>(url, {
			method,
			body:
				data instanceof FormData
					? data
					: data
						? JSON.stringify(data)
						: undefined,
			headers,
			signal,
			skipLoading,
			params,
		});

		return {
			data: response,
			status: 200,
			statusText: "OK",
		};
	} catch (error) {
		if (error instanceof CustomFetchError) {
			throw error;
		}
		throw error;
	}
};

export type Client<
	_TData = unknown,
	_TError = unknown,
	_TVariables = unknown,
> = typeof client;

export default client as Client;

export async function customFetch<T = unknown>(
	input: RequestInfo,
	init?: CustomFetchOptions,
): Promise<FetchResponse<T>> {
	const { skipLoading = false, params, ...fetchOptions } = init || {};

	const loadingElement = !skipLoading
		? document.getElementById("loading")
		: null;
	const baseUrl = config.apiBaseUrl;

	try {
		loadingElement?.classList.remove("hidden");

		const headers = new Headers(fetchOptions?.headers || {});

		if (fetchOptions?.body && !(fetchOptions.body instanceof FormData)) {
			headers.set("Content-Type", "application/json");
		}

		const url = new URL(`${baseUrl}${input}`);

		if (params) {
			const query = new URLSearchParams();
			Object.entries(params).forEach(([key, value]) => {
				if (value != null && value !== "") {
					query.append(key, String(value));
				}
			});
			url.search = query.toString();
		}

		const response = await fetch(url.toString(), {
			...fetchOptions,
			headers,
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => ({
				status: response.status,
				message: `HTTP error ${response.status}: ${response.statusText}`,
			}));

			throw new CustomFetchError(
				errorBody.message || "Unknown error occurred",
				response.status,
			);
		}

		const contentType = response.headers.get("Content-Type");
		if (contentType?.includes("application/json")) {
			return response.json() as Promise<T>;
		}

		return response.text() as unknown as T;
	} catch (error) {
		if (error instanceof CustomFetchError) {
			console.error(`Fetch error: ${error.message} (status: ${error.status})`);
			return Promise.reject(error);
		}
		throw error;
	} finally {
		loadingElement?.classList.add("hidden");
	}
}
