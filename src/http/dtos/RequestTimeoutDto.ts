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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"request timeout";
		if (typeof errors === "string") {
			super(HttpStatus.REQUEST_TIMEOUT, errors ?? defaultMessage);
		} else {
			super(HttpStatus.REQUEST_TIMEOUT, defaultMessage, errors);
		}
	}
}
