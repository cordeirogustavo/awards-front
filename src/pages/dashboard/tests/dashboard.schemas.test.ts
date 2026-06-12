import { describe, expect, it } from "vitest";
import { searchByYearSchema } from "../dashboard.schemas";

describe("searchByYearSchema", () => {
	it("accepts a valid year", () => {
		const result = searchByYearSchema.safeParse({ year: "2020" });

		expect(result.success).toBe(true);
		expect(result.data?.year).toBe(2020);
	});

	it("rejects a non-numeric value", () => {
		const result = searchByYearSchema.safeParse({ year: "abc" });

		expect(result.success).toBe(false);
	});

	it("rejects a non-integer year", () => {
		const result = searchByYearSchema.safeParse({ year: "2020.5" });

		expect(result.success).toBe(false);
	});

	it("rejects a year before 1800", () => {
		const result = searchByYearSchema.safeParse({ year: "1799" });

		expect(result.success).toBe(false);
	});

	it("rejects a year after the current year", () => {
		const nextYear = new Date().getFullYear() + 1;
		const result = searchByYearSchema.safeParse({ year: String(nextYear) });

		expect(result.success).toBe(false);
	});

	it("accepts the current year", () => {
		const currentYear = new Date().getFullYear();
		const result = searchByYearSchema.safeParse({ year: String(currentYear) });

		expect(result.success).toBe(true);
	});
});
