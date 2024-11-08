import { describe, expect, it, vi } from "vitest";
import { BaseException } from "../baseException/BaseException";
import { Exception } from "../exception/Exception";

// types
import type { TMiddleware } from "../types";

const mockMiddleware: TMiddleware<BaseException> = vi.fn((_, next) => {
	next();
});

describe("Exception Class", () => {
	it("should call global middlewares", () => {
		BaseException.use(mockMiddleware);

		new Exception("Test message");

		expect(mockMiddleware).toHaveBeenCalled();
	});

	it("should call instance middlewares", () => {
		const instanceMiddleware = vi.fn((_, next) => next());
		Exception.use(instanceMiddleware);

		new Exception("Test message");

		expect(instanceMiddleware).toHaveBeenCalled();
	});

	it("should call middlewares in the correct order (global first, then instance)", () => {
		const globalMiddleware1: TMiddleware<BaseException> = vi.fn((exc, next) => {
			exc.message = `${exc.message} first`;
			next();
		});
		const globalMiddleware2: TMiddleware<BaseException> = vi.fn((exc, next) => {
			exc.message = `${exc.message} second`;
			next();
		});
		const instanceMiddleware = vi.fn((_, next) => next());

		BaseException.use(globalMiddleware1);
		BaseException.use(globalMiddleware2);
		Exception.use(instanceMiddleware);

		const exception = new Exception("Test message");

		expect(globalMiddleware1).toHaveBeenCalled();
		expect(globalMiddleware2).toHaveBeenCalled();
		expect(instanceMiddleware).toHaveBeenCalled();
		expect(exception.message).toBe("Test message first second");
	});

	it("should pass exception and next to each middleware", () => {
		const instanceMiddleware: TMiddleware = vi.fn((_, next) => next());

		Exception.use(instanceMiddleware);
		const exception = new Exception("Test message");

		expect(instanceMiddleware).toHaveBeenCalledWith(
			exception,
			expect.any(Function),
		);
	});
});
