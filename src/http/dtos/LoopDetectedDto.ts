import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class LoopDetectedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.LOOP_DETECTED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.LOOP_DETECTED;

	@ApiProperty({
		example: "LoopDetected",
		description: "Error Name",
	})
	error = "LoopDetected";

	@ApiProperty({
		type: String,
		example: "loop detected",
		description: "Error message",
	})
	message = "loop detected";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "loop detected";
		if (typeof errors === "string") {
			super(HttpStatus.LOOP_DETECTED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.LOOP_DETECTED, defaultMessage, errors);
		}
	}
}
