import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class GatewayTimeoutDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.GATEWAY_TIMEOUT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.GATEWAY_TIMEOUT;

	@ApiProperty({
		type: String,
		example: "GatewayTimeout",
		description: "Error Name",
	})
	error = "GatewayTimeout";

	@ApiProperty({
		type: String,
		example: "gateway timeout",
		description: "Error message",
	})
	message = "gateway timeout";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.gateway_timeout",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.GATEWAY_TIMEOUT,
			isArray ? "errors.gateway_timeout" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
