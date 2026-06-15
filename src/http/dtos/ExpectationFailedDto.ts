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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.expectation_failed",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.EXPECTATION_FAILED,
			isArray ? "errors.expectation_failed" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
