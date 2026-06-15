import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class UriTooLongDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.URI_TOO_LONG,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.URI_TOO_LONG;

	@ApiProperty({
		type: String,
		example: "UriTooLong",
		description: "Error Name",
	})
	error = "UriTooLong";

	@ApiProperty({
		type: String,
		example: "uri too long",
		description: "Error message",
	})
	message = "uri too long";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.uri_too_long",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.URI_TOO_LONG,
			isArray ? "errors.uri_too_long" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
