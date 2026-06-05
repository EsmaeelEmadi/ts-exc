import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class MisdirectedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.MISDIRECTED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.MISDIRECTED;

	@ApiProperty({
		example: "Misdirected",
		description: "Error Name",
	})
	error = "Misdirected";

	@ApiProperty({
		type: String,
		example: "misdirected request",
		description: "Error message",
	})
	message = "misdirected request";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"misdirected request";
		if (typeof errors === "string") {
			super(HttpStatus.MISDIRECTED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.MISDIRECTED, defaultMessage, errors);
		}
	}
}
