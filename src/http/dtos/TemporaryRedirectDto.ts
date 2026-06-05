import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class TemporaryRedirectDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.TEMPORARY_REDIRECT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.TEMPORARY_REDIRECT;

	@ApiProperty({
		type: String,
		example: "temporary redirect",
		description: "Success message",
	})
	message: string;

	@ApiProperty({
		type: Object,
		description: "Response data",
		required: false,
	})
	data?: T;

	constructor(data?: T, message?: string) {
		this.message =
			message ?? "temporary redirect";
		this.data = data;
	}
}
