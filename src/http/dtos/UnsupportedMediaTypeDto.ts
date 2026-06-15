import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class UnsupportedMediaTypeDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.UNSUPPORTED_MEDIA_TYPE;

	@ApiProperty({
		type: String,
		example: "UnsupportedMediaType",
		description: "Error Name",
	})
	error = "UnsupportedMediaType";

	@ApiProperty({
		type: String,
		example: "unsupported media type",
		description: "Error message",
	})
	message = "unsupported media type";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.unsupported_media_type",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.UNSUPPORTED_MEDIA_TYPE,
			isArray ? "errors.unsupported_media_type" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
