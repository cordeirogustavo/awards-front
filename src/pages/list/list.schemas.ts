import z from "zod";

export const LIST_PAGE_SIZE = 15;

export const listSearchSchema = z.object({
	page: z.number().int().min(0).catch(0),
	year: z.number().int().optional().catch(undefined),
	winner: z.boolean().optional().catch(undefined),
});

export type IListSearch = z.infer<typeof listSearchSchema>;
