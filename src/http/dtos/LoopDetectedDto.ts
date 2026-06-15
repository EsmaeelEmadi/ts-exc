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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.loop_detected",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.LOOP_DETECTED,
			isArray ? "errors.loop_detected" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
