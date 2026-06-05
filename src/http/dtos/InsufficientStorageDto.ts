import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class InsufficientStorageDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.INSUFFICIENT_STORAGE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.INSUFFICIENT_STORAGE;

	@ApiProperty({
		example: "InsufficientStorage",
		description: "Error Name",
	})
	error = "InsufficientStorage";

	@ApiProperty({
		type: String,
		example: "insufficient storage",
		description: "Error message",
	})
	message = "insufficient storage";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"insufficient storage";
		if (typeof errors === "string") {
			super(HttpStatus.INSUFFICIENT_STORAGE, errors ?? defaultMessage);
		} else {
			super(HttpStatus.INSUFFICIENT_STORAGE, defaultMessage, errors);
		}
	}
}
