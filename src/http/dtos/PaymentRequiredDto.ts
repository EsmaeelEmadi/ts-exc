import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class PaymentRequiredDto extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PAYMENT_REQUIRED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PAYMENT_REQUIRED;

	@ApiProperty({
		type: String,
		example: "PaymentRequired",
		description: "Error Name",
	})
	error = "PaymentRequired";

	@ApiProperty({
		type: String,
		example: "payment required",
		description: "Error message",
	})
	message = "payment required";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.payment_required",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.PAYMENT_REQUIRED,
			isArray ? "errors.payment_required" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
