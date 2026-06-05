import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class NoContentDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.NO_CONTENT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.NO_CONTENT;

	@ApiProperty({
		type: String,
		example: "no content",
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
		this.message = message ?? "no content";
		this.data = data;
	}
}
