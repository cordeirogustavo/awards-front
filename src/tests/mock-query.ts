export function mockQueryResult<TFn extends (...args: never[]) => unknown>(
	partial: Partial<NonNullable<ReturnType<TFn>>>,
): ReturnType<TFn> {
	return partial as unknown as ReturnType<TFn>;
}
