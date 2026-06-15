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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.bad_request",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.BAD_REQUEST,
			isArray ? "errors.bad_request" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
