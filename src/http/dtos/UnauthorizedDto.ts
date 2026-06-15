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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.unauthorized",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.UNAUTHORIZED,
			isArray ? "errors.unauthorized" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
