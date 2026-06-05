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
		type: [ValidationErrorDto],
	})
	errors?: ValidationErrorDto[];

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage =
			"payment required";
		if (typeof errors === "string") {
			super(HttpStatus.PAYMENT_REQUIRED, errors ?? defaultMessage);
		} else {
			super(HttpStatus.PAYMENT_REQUIRED, defaultMessage, errors);
		}
	}
}
