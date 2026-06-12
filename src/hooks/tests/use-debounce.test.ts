import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "../use-debounce";

describe("useDebounce", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns the initial value immediately", () => {
		const { result } = renderHook(() => useDebounce("initial", 500));

		expect(result.current).toBe("initial");
	});

	it("does not update the value before the delay has passed", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "initial", delay: 500 } },
		);

		rerender({ value: "updated", delay: 500 });
		act(() => {
			vi.advanceTimersByTime(400);
		});

		expect(result.current).toBe("initial");
	});

	it("updates the value after the delay has passed", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "initial", delay: 500 } },
		);

		rerender({ value: "updated", delay: 500 });
		act(() => {
			vi.advanceTimersByTime(500);
		});

		expect(result.current).toBe("updated");
	});

	it("resets the timer when the value changes again before the delay finishes", () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: "initial", delay: 500 } },
		);

		rerender({ value: "intermediate", delay: 500 });
		act(() => {
			vi.advanceTimersByTime(300);
		});
		rerender({ value: "final", delay: 500 });
		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(result.current).toBe("initial");

		act(() => {
			vi.advanceTimersByTime(200);
		});

		expect(result.current).toBe("final");
	});
});
