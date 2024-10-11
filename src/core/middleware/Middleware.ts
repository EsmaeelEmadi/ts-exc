import { BaseMiddleware } from "./BaseMiddleware";

export class Middleware<T> extends BaseMiddleware<T> {
	public use(middleware: (exc: T) => void): void {
		this.push(middleware);
	}

	public run(exc: T): void {
		for (const middleware of this) {
			middleware(exc);
		}
	}

	constructor() {
		super();
	}
}
