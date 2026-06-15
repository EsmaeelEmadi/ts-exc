import { HttpExceptionOptions } from "@nestjs/common";
import { BaseException } from "./baseException";
import type { TMiddleware } from "./types";

export abstract class Exception extends BaseException {
  #instanceMiddlewares: TMiddleware<this>[] = [];

  /**
   * Debug context attached to this exception.
   *
   * Stored on the instance directly (not in the response body), so it's
   * available in server-side logs (`console.log`, structured loggers)
   * but is NOT serialized in the HTTP response sent to the client.
   *
   * @example
   *   return new InternalServerErrorDto()
   *     .debug({ cause: dbError });
   */
  debug?: Record<string, unknown>;

  /**
   * Attach debug context to this exception.
   *
   * The provided info is merged into the `debug` property of the instance.
   * This is useful for preserving the original error, request context, or
   * any other diagnostic data that should not reach the client.
   *
   * @returns `this` for method chaining.
   */
  details(info: Record<string, unknown>): this {
    this.debug = { ...this.debug, ...info };
    return this;
  }

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
