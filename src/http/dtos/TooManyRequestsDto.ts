import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class TooManyRequestsDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.TOO_MANY_REQUESTS,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.TOO_MANY_REQUESTS;

	@ApiProperty({
		type: String,
		example: "TooManyRequests",
		description: "Error Name",
	})
	error = "TooManyRequests";

	@ApiProperty({
		type: String,
		example: "too many requests",
		description: "Error message",
	})
	message = "too many requests";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.too_many_requests",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.TOO_MANY_REQUESTS,
			isArray ? "errors.too_many_requests" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
