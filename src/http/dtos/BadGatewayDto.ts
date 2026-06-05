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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "bad gateway";
		if (typeof errors === "string") {
			super(HttpStatus.BAD_GATEWAY, errors ?? defaultMessage);
		} else {
			super(HttpStatus.BAD_GATEWAY, defaultMessage, errors);
		}
	}
}
