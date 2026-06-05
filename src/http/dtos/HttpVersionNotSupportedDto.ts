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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"http version not supported";
		if (typeof errors === "string") {
			super(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, defaultMessage, errors);
		}
	}
}
