// types
import type { TExceptionArgs, TMiddleware } from "../types";

export abstract class BaseException extends Error {
	protected static globalMiddlewares: TMiddleware<BaseException>[] = [];

	public static use(middleware: TMiddleware<BaseException>) {
		BaseException.globalMiddlewares.push(middleware);
	}

	public details: Record<string, unknown> = {};

	constructor(
		message: string,
		public args?: TExceptionArgs,
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
