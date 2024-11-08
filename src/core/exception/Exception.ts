import { BaseException } from "../baseException/BaseException";

// types
import type { TExceptionArgs, TMiddleware } from "../types";

export class Exception extends BaseException {
	protected instanceMiddlewares: TMiddleware<this>[] = [];

	public push(middleware: TMiddleware<this>) {
		this.instanceMiddlewares.push(middleware);
	}

	private runMiddlewares() {
		let index = -1;

		const globalLength = BaseException.globalMiddlewares.length;
		const instanceLength = this.instanceMiddlewares.length;
		const totalLength = globalLength + instanceLength;

		const next = () => {
			index++;
			if (index < totalLength) {
				if (index < globalLength) {
					BaseException.globalMiddlewares[index](this, next);
				} else {
					this.instanceMiddlewares[index - globalLength](this, next);
				}
			}
		};

		next();
	}

	constructor(
		message: string,
		public args?: TExceptionArgs,
		public code?: string | number | undefined,
	) {
		super(message, args);
		this.runMiddlewares();
	}
}
