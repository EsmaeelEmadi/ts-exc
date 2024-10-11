import { Middleware } from "../middleware/Middleware";

export abstract class BaseException extends Error {
	static globalMiddlewares = new Middleware<BaseException>();
	protected instanceMiddlewares = new Middleware<BaseException>();

	private runInstanceMiddlewares() {
		if (this.instanceMiddlewares) {
			this.instanceMiddlewares.run(this);
		}
	}

	public readonly code: number | string | undefined;

	constructor(
		message: string,
		code?: number | string | undefined,
		public details?: string | Record<string, string> | Array<unknown>,
	) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		Error.captureStackTrace(this, this.constructor);

		BaseException.globalMiddlewares.run(this);
		this.runInstanceMiddlewares();
	}
}
