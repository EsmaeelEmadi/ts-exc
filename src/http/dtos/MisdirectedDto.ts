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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.misdirected",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.MISDIRECTED,
			isArray ? "errors.misdirected" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
