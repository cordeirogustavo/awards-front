import { describe, expect, it } from "vitest";
import { listSearchSchema } from "../list.schemas";

describe("listSearchSchema", () => {
	it("parses valid search params", () => {
		const result = listSearchSchema.parse({
			page: 2,
			year: 2020,
			winner: true,
		});

		expect(result).toEqual({ page: 2, year: 2020, winner: true });
	});

	it("defaults page to 0 when missing or invalid", () => {
		expect(listSearchSchema.parse({})).toMatchObject({ page: 0 });
		expect(listSearchSchema.parse({ page: -1 })).toMatchObject({ page: 0 });
		expect(listSearchSchema.parse({ page: 1.5 })).toMatchObject({ page: 0 });
	});

	it("falls back to undefined for an invalid year", () => {
		const result = listSearchSchema.parse({ page: 0, year: "not-a-year" });

		expect(result.year).toBeUndefined();
	});

	it("falls back to undefined for an invalid winner", () => {
		const result = listSearchSchema.parse({ page: 0, winner: "yes" });

		expect(result.winner).toBeUndefined();
	});

	it("omits year and winner when not provided", () => {
		const result = listSearchSchema.parse({ page: 0 });

		expect(result.year).toBeUndefined();
		expect(result.winner).toBeUndefined();
	});
});
