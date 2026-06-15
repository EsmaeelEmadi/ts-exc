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
		type: String,
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
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.locked",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.LOCKED,
			isArray ? "errors.locked" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
