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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.insufficient_storage",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.INSUFFICIENT_STORAGE,
			isArray ? "errors.insufficient_storage" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
