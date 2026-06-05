import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class BadRequestDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.BAD_REQUEST,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.BAD_REQUEST;

	@ApiProperty({
		example: "BadRequest",
		description: "Error Name",
	})
	error = "BadRequest";

	@ApiProperty({
		type: String,
		example: "bad request",
		description: "Error message",
	})
	message = "bad request";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "bad request";
		if (typeof errors === "string") {
			super(HttpStatus.BAD_REQUEST, errors ?? defaultMessage);
		} else {
			super(HttpStatus.BAD_REQUEST, defaultMessage, errors);
		}
	}
}
