import z from "zod";

export const searchByYearSchema = z.object({
	year: z.coerce
		.number({
			error: "Please enter a year",
		})
		.int("Please enter a valid year")
		.min(1800, "Please enter a valid year")
		.max(new Date().getFullYear(), "Please enter a valid year"),
});
