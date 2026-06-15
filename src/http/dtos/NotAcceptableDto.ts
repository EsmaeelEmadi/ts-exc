import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class NotAcceptableDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.NOT_ACCEPTABLE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.NOT_ACCEPTABLE;

	@ApiProperty({
		type: String,
		example: "NotAcceptable",
		description: "Error Name",
	})
	error = "NotAcceptable";

	@ApiProperty({
		type: String,
		example: "not acceptable",
		description: "Error message",
	})
	message = "not acceptable";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.not_acceptable",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.NOT_ACCEPTABLE,
			isArray ? "errors.not_acceptable" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
