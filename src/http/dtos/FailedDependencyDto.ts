import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class FailedDependencyDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.FAILED_DEPENDENCY,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.FAILED_DEPENDENCY;

	@ApiProperty({
		type: String,
		example: "FailedDependency",
		description: "Error Name",
	})
	error = "FailedDependency";

	@ApiProperty({
		type: String,
		example: "failed dependency",
		description: "Error message",
	})
	message = "failed dependency";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.failed_dependency",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.FAILED_DEPENDENCY,
			isArray ? "errors.failed_dependency" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
