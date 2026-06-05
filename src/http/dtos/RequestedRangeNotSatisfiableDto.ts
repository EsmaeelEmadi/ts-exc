import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class RequestedRangeNotSatisfiableDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE;

	@ApiProperty({
		example: "RequestedRangeNotSatisfiable",
		description: "Error Name",
	})
	error = "RequestedRangeNotSatisfiable";

	@ApiProperty({
		type: String,
		example: "range not satisfiable",
		description: "Error message",
	})
	message = "range not satisfiable";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"range not satisfiable";
		if (typeof errors === "string") {
			super(
				HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
				errors ?? defaultMessage,
			);
		} else {
			super(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, defaultMessage, errors);
		}
	}
}
