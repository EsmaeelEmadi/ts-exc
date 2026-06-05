import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ConflictDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.CONFLICT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.CONFLICT;

	@ApiProperty({
		example: "Conflict",
		description: "Error Name",
	})
	error = "Conflict";

	@ApiProperty({
		type: String,
		example: "conflict",
		description: "Error message",
	})
	message = "conflict";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "conflict";
		if (typeof errors === "string") {
			super(HttpStatus.CONFLICT, errors ?? defaultMessage);
		} else {
			super(HttpStatus.CONFLICT, defaultMessage, errors);
		}
	}
}
