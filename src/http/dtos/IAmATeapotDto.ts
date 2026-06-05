import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class IAmATeapotDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.I_AM_A_TEAPOT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.I_AM_A_TEAPOT;

	@ApiProperty({
		example: "IAmATeapot",
		description: "Error Name",
	})
	error = "IAmATeapot";

	@ApiProperty({
		type: String,
		example: "i am a teapot",
		description: "Error message",
	})
	message = "i am a teapot";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "i am a teapot";
		if (typeof errors === "string") {
			super(HttpStatus.I_AM_A_TEAPOT, errors ?? defaultMessage);
		} else {
			super(HttpStatus.I_AM_A_TEAPOT, defaultMessage, errors);
		}
	}
}
