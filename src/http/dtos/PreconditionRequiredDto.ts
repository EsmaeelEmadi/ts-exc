import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class PreconditionRequiredDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PRECONDITION_REQUIRED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PRECONDITION_REQUIRED;

	@ApiProperty({
		example: "PreconditionRequired",
		description: "Error Name",
	})
	error = "PreconditionRequired";

	@ApiProperty({
		type: String,
		example: "precondition required",
		description: "Error message",
	})
	message = "precondition required";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"precondition required";
		if (typeof errors === "string") {
			super(HttpStatus.PRECONDITION_REQUIRED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.PRECONDITION_REQUIRED, defaultMessage, errors);
		}
	}
}
