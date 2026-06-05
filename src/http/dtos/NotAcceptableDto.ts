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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "not acceptable";
		if (typeof errors === "string") {
			super(HttpStatus.NOT_ACCEPTABLE, errors ?? defaultMessage);
		} else {
			super(HttpStatus.NOT_ACCEPTABLE, defaultMessage, errors);
		}
	}
}
