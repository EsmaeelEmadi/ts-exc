import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class GoneDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.GONE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.GONE;

	@ApiProperty({
		type: String,
		example: "Gone",
		description: "Error Name",
	})
	error = "Gone";

	@ApiProperty({
		type: String,
		example: "gone",
		description: "Error message",
	})
	message = "gone";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.gone",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.GONE,
			isArray ? "errors.gone" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
