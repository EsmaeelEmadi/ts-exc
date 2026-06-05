import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class UnauthorizedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.UNAUTHORIZED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.UNAUTHORIZED;

	@ApiProperty({
		example: "Unauthorized",
		description: "Error Name",
	})
	error = "Unauthorized";

	@ApiProperty({
		type: String,
		example: "unauthorized",
		description: "Error message",
	})
	message = "unauthorized";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "unauthorized";
		if (typeof errors === "string") {
			super(HttpStatus.UNAUTHORIZED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.UNAUTHORIZED, defaultMessage, errors);
		}
	}
}
