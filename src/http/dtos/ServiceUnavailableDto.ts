import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ServiceUnavailableDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.SERVICE_UNAVAILABLE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.SERVICE_UNAVAILABLE;

	@ApiProperty({
		example: "ServiceUnavailable",
		description: "Error Name",
	})
	error = "ServiceUnavailable";

	@ApiProperty({
		type: String,
		example: "service unavailable",
		description: "Error message",
	})
	message = "service unavailable";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"service unavailable";
		if (typeof errors === "string") {
			super(HttpStatus.SERVICE_UNAVAILABLE, errors ?? defaultMessage);
		} else {
			super(HttpStatus.SERVICE_UNAVAILABLE, defaultMessage, errors);
		}
	}
}
