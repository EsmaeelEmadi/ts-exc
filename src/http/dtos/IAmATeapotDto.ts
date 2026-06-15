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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.i_am_a_teapot",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.I_AM_A_TEAPOT,
			isArray ? "errors.i_am_a_teapot" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
