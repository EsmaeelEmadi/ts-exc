import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ProxyAuthenticationRequiredDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PROXY_AUTHENTICATION_REQUIRED;

	@ApiProperty({
		type: String,
		example: "ProxyAuthenticationRequired",
		description: "Error Name",
	})
	error = "ProxyAuthenticationRequired";

	@ApiProperty({
		type: String,
		example: "proxy authentication required",
		description: "Error message",
	})
	message = "proxy authentication required";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.proxy_authentication_required",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
			isArray ? "errors.proxy_authentication_required" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
