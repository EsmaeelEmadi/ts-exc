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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"failed dependency";
		if (typeof errors === "string") {
			super(HttpStatus.FAILED_DEPENDENCY, errors ?? defaultMessage);
		} else {
			super(HttpStatus.FAILED_DEPENDENCY, defaultMessage, errors);
		}
	}
}
