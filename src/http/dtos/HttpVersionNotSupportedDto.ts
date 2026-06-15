import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class HttpVersionNotSupportedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.HTTP_VERSION_NOT_SUPPORTED;

	@ApiProperty({
		type: String,
		example: "HttpVersionNotSupported",
		description: "Error Name",
	})
	error = "HttpVersionNotSupported";

	@ApiProperty({
		type: String,
		example: "http version not supported",
		description: "Error message",
	})
	message = "http version not supported";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.http_version_not_supported",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
			isArray ? "errors.http_version_not_supported" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
