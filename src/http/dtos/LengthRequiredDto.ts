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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"length required";
		if (typeof errors === "string") {
			super(HttpStatus.LENGTH_REQUIRED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.LENGTH_REQUIRED, defaultMessage, errors);
		}
	}
}
