export type TNext = () => void;
export type TMiddleware<T = unknown> = (exc: T, next: TNext) => void;
export type TExceptionArgs = string | Record<string, string> | unknown[];

export type TJoin<
	T extends readonly string[],
	Sep extends string = ",",
> = T extends readonly [
	infer First extends string,
	...infer Rest extends readonly string[],
]
	? Rest["length"] extends 0
		? First
		: `${First}${Sep}${TJoin<Rest, Sep>}`
	: never;
