import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class NotImplementedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.NOT_IMPLEMENTED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.NOT_IMPLEMENTED;

	@ApiProperty({
		example: "NotImplemented",
		description: "Error Name",
	})
	error = "NotImplemented";

	@ApiProperty({
		type: String,
		example: "not implemented",
		description: "Error message",
	})
	message = "not implemented";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"not implemented";
		if (typeof errors === "string") {
			super(HttpStatus.NOT_IMPLEMENTED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.NOT_IMPLEMENTED, defaultMessage, errors);
		}
	}
}
