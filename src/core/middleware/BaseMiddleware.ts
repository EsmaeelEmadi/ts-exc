export abstract class BaseMiddleware<T> extends Array<(exc: T) => void> {}
