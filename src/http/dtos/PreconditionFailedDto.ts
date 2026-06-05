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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"precondition failed";
		if (typeof errors === "string") {
			super(HttpStatus.PRECONDITION_FAILED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.PRECONDITION_FAILED, defaultMessage, errors);
		}
	}
}
