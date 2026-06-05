import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class InternalServerErrorDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.INTERNAL_SERVER_ERROR,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

	@ApiProperty({
		example: "InternalServerError",
		description: "Error Name",
	})
	error = "InternalServerError";

	@ApiProperty({
		type: String,
		example: "internal server error",
		description: "Error message",
	})
	message = "internal server error";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"internal server error";
		if (typeof errors === "string") {
			super(HttpStatus.INTERNAL_SERVER_ERROR, errors ?? defaultMessage);
		} else {
			super(HttpStatus.INTERNAL_SERVER_ERROR, defaultMessage, errors);
		}
	}
}
