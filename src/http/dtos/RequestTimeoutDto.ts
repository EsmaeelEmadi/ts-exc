import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class RequestTimeoutDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.REQUEST_TIMEOUT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.REQUEST_TIMEOUT;

	@ApiProperty({
		type: String,
		example: "RequestTimeout",
		description: "Error Name",
	})
	error = "RequestTimeout";

	@ApiProperty({
		type: String,
		example: "request timeout",
		description: "Error message",
	})
	message = "request timeout";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.request_timeout",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.REQUEST_TIMEOUT,
			isArray ? "errors.request_timeout" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
