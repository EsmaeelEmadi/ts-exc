import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class MethodNotAllowedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.METHOD_NOT_ALLOWED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.METHOD_NOT_ALLOWED;

	@ApiProperty({
		example: "MethodNotAllowed",
		description: "Error Name",
	})
	error = "MethodNotAllowed";

	@ApiProperty({
		type: String,
		example: "method not allowed",
		description: "Error message",
	})
	message = "method not allowed";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"method not allowed";
		if (typeof errors === "string") {
			super(HttpStatus.METHOD_NOT_ALLOWED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.METHOD_NOT_ALLOWED, defaultMessage, errors);
		}
	}
}
