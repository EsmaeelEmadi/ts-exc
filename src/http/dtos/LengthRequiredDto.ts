import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class LengthRequiredDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.LENGTH_REQUIRED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.LENGTH_REQUIRED;

	@ApiProperty({
		type: String,
		example: "LengthRequired",
		description: "Error Name",
	})
	error = "LengthRequired";

	@ApiProperty({
		type: String,
		example: "length required",
		description: "Error message",
	})
	message = "length required";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.length_required",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.LENGTH_REQUIRED,
			isArray ? "errors.length_required" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
