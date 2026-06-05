import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ExpectationFailedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.EXPECTATION_FAILED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.EXPECTATION_FAILED;

	@ApiProperty({
		example: "ExpectationFailed",
		description: "Error Name",
	})
	error = "ExpectationFailed";

	@ApiProperty({
		type: String,
		example: "expectation failed",
		description: "Error message",
	})
	message = "expectation failed";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"expectation failed";
		if (typeof errors === "string") {
			super(HttpStatus.EXPECTATION_FAILED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.EXPECTATION_FAILED, defaultMessage, errors);
		}
	}
}
