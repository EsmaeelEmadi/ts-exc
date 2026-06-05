import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ForbiddenDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.FORBIDDEN,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.FORBIDDEN;

	@ApiProperty({
		example: "Forbidden",
		description: "Error Name",
	})
	error = "Forbidden";

	@ApiProperty({
		type: String,
		example: "forbidden",
		description: "Error message",
	})
	message = "forbidden";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "forbidden";
		if (typeof errors === "string") {
			super(HttpStatus.FORBIDDEN, errors ?? defaultMessage);
		} else {
			super(HttpStatus.FORBIDDEN, defaultMessage, errors);
		}
	}
}
