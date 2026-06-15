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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.requested_range_not_satisfiable",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
			isArray ? "errors.requested_range_not_satisfiable" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
