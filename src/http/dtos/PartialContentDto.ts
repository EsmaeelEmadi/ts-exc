import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class PartialContentDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PARTIAL_CONTENT,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PARTIAL_CONTENT;

	@ApiProperty({
		type: String,
		example: "partial content",
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
		this.message = message ?? "partial content";
		this.data = data;
	}
}
