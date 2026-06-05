import { HttpExceptionOptions } from "@nestjs/common";
import { BaseException } from "./baseException";
import type { TMiddleware } from "./types";

export abstract class Exception extends BaseException {
	#instanceMiddlewares: TMiddleware<this>[] = [];

	public push(middleware: TMiddleware<this>) {
		this.#instanceMiddlewares.push(middleware);
	}

	private runMiddlewares() {
		let index = -1;

		const globalLength = BaseException.globalMiddlewares.length;
		const instanceLength = this.#instanceMiddlewares.length;
		const totalLength = globalLength + instanceLength;

		const next = () => {
			index++;
			if (index < totalLength) {
				if (index < globalLength) {
					BaseException.globalMiddlewares[index](this, next);
				} else {
					this.#instanceMiddlewares[index - globalLength](this, next);
				}
			}
		};

		next();
	}

	constructor(
		response: string | Record<string, unknown>,
		status: number,
		options?: HttpExceptionOptions,
	) {
		super(response, status, options);
		this.runMiddlewares();
	}
}
