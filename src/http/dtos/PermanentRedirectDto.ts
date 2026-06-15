import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class PermanentRedirectDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PERMANENT_REDIRECT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PERMANENT_REDIRECT;

	@ApiProperty({
		type: String,
		example: "permanent redirect",
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
		this.message = message ?? "permanent redirect";
		this.data = data;
	}
}
