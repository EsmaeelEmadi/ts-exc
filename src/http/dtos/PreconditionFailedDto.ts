import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class PreconditionFailedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PRECONDITION_FAILED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PRECONDITION_FAILED;

	@ApiProperty({
		type: String,
		example: "PreconditionFailed",
		description: "Error Name",
	})
	error = "PreconditionFailed";

	@ApiProperty({
		type: String,
		example: "precondition failed",
		description: "Error message",
	})
	message = "precondition failed";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.precondition_failed",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.PRECONDITION_FAILED,
			isArray ? "errors.precondition_failed" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
