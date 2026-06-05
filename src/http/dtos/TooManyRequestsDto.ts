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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"too many requests";
		if (typeof errors === "string") {
			super(HttpStatus.TOO_MANY_REQUESTS, errors ?? defaultMessage);
		} else {
			super(HttpStatus.TOO_MANY_REQUESTS, defaultMessage, errors);
		}
	}
}
