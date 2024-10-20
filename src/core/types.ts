export type TNext = () => void;
export type TMiddleware<T = unknown> = (exc: T, next: TNext) => void;
export type TExceptionArgs = string | Record<string, string> | Array<unknown>;
