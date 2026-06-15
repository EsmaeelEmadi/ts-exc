import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ServiceUnavailableDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.SERVICE_UNAVAILABLE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.SERVICE_UNAVAILABLE;

	@ApiProperty({
		type: String,
		example: "ServiceUnavailable",
		description: "Error Name",
	})
	error = "ServiceUnavailable";

	@ApiProperty({
		type: String,
		example: "service unavailable",
		description: "Error message",
	})
	message = "service unavailable";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.service_unavailable",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.SERVICE_UNAVAILABLE,
			isArray ? "errors.service_unavailable" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
