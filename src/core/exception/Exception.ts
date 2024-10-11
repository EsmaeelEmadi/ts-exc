import { BaseException } from "./BaseException";

export class Exception extends BaseException {
	public code = undefined;

	constructor(
		message: string,
		public details?: string | Record<string, string> | Array<unknown>,
		code?: string | number | undefined,
	) {
		super(message, code);
		this.name = this.constructor.name;
	}
}
