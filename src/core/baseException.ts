import { HttpException, HttpExceptionOptions } from "@nestjs/common";
import type { TMiddleware } from "./types";

export abstract class BaseException extends HttpException {
	protected static globalMiddlewares: TMiddleware<BaseException>[] = [];

	public static use(middleware: TMiddleware<BaseException>) {
		BaseException.globalMiddlewares.push(middleware);
	}

	constructor(
		response: string | Record<string, unknown>,
		status: number,
		options?: HttpExceptionOptions,
	) {
		super(response, status, options);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
