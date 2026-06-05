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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "uri too long";
		if (typeof errors === "string") {
			super(HttpStatus.URI_TOO_LONG, errors ?? defaultMessage);
		} else {
			super(HttpStatus.URI_TOO_LONG, defaultMessage, errors);
		}
	}
}
