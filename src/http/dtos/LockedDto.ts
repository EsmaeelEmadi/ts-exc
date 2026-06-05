import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class LockedDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.LOCKED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.LOCKED;

	@ApiProperty({
		example: "Locked",
		description: "Error Name",
	})
	error = "Locked";

	@ApiProperty({
		type: String,
		example: "locked",
		description: "Error message",
	})
	message = "locked";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "locked";
		if (typeof errors === "string") {
			super(HttpStatus.LOCKED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.LOCKED, defaultMessage, errors);
		}
	}
}
