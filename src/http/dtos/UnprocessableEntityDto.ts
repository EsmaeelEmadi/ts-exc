import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class UnprocessableEntityDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.UNPROCESSABLE_ENTITY,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.UNPROCESSABLE_ENTITY;

	@ApiProperty({
		example: "UnprocessableEntity",
		description: "Error Name",
	})
	error = "UnprocessableEntity";

	@ApiProperty({
		type: String,
		example: "unprocessable entity",
		description: "Error message",
	})
	message = "unprocessable entity";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"unprocessable entity";
		if (typeof errors === "string") {
			super(HttpStatus.UNPROCESSABLE_ENTITY, errors ?? defaultMessage);
		} else {
			super(HttpStatus.UNPROCESSABLE_ENTITY, defaultMessage, errors);
		}
	}
}
