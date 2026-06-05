import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class PayloadTooLargeDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PAYLOAD_TOO_LARGE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PAYLOAD_TOO_LARGE;

	@ApiProperty({
		example: "PayloadTooLarge",
		description: "Error Name",
	})
	error = "PayloadTooLarge";

	@ApiProperty({
		type: String,
		example: "payload too large",
		description: "Error message",
	})
	message = "payload too large";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"payload too large";
		if (typeof errors === "string") {
			super(HttpStatus.PAYLOAD_TOO_LARGE, errors ?? defaultMessage);
		} else {
			super(HttpStatus.PAYLOAD_TOO_LARGE, defaultMessage, errors);
		}
	}
}
