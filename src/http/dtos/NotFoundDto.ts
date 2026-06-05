import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class NotFoundDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.NOT_FOUND,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.NOT_FOUND;

	@ApiProperty({
		example: "NotFound",
		description: "Error Name",
	})
	error = "NotFound";

	@ApiProperty({
		type: String,
		example: "not found",
		description: "Error message",
	})
	message = "not found";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "not found";
		if (typeof errors === "string") {
			super(HttpStatus.NOT_FOUND, errors ?? defaultMessage);
		} else {
			super(HttpStatus.NOT_FOUND, defaultMessage, errors);
		}
	}
}
