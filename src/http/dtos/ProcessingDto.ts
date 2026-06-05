import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ProcessingDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.PROCESSING,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.PROCESSING;

	@ApiProperty({
		type: String,
		example: "processing",
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
		this.message = message ?? "processing";
		this.data = data;
	}
}
