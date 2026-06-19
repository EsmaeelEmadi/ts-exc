import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class NotFoundDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.NOT_FOUND,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.NOT_FOUND;

	@ApiProperty({
		type: String,
		example: "NotFound",
		description: "Error Name",
	})
	error = "NotFound";

	@ApiProperty({
		type: String,
		example: "not found",
		description: "Error message",
	})
	message = "not found";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.not_found",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.NOT_FOUND,
			isArray ? "errors.not_found" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
