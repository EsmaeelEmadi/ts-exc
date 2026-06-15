import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class BadGatewayDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.BAD_GATEWAY,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.BAD_GATEWAY;

	@ApiProperty({
		type: String,
		example: "BadGateway",
		description: "Error Name",
	})
	error = "BadGateway";

	@ApiProperty({
		type: String,
		example: "bad gateway",
		description: "Error message",
	})
	message = "bad gateway";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.bad_gateway",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.BAD_GATEWAY,
			isArray ? "errors.bad_gateway" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
