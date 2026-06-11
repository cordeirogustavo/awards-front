type Config = {
	apiBaseUrl: string;
	appName: string;
};

export const config: Config = {
	apiBaseUrl:
		import.meta.env.VITE_API_BASE_URL || "https://challenge.outsera.tech",
	appName: import.meta.env.VITE_APP_NAME || "Awards App",
};
