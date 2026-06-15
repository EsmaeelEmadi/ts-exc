import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class MethodNotAllowedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.METHOD_NOT_ALLOWED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.METHOD_NOT_ALLOWED;

	@ApiProperty({
		type: String,
		example: "MethodNotAllowed",
		description: "Error Name",
	})
	error = "MethodNotAllowed";

	@ApiProperty({
		type: String,
		example: "method not allowed",
		description: "Error message",
	})
	message = "method not allowed";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.method_not_allowed",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.METHOD_NOT_ALLOWED,
			isArray ? "errors.method_not_allowed" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
