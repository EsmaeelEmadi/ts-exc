import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class MultiStatusDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.MULTI_STATUS,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.MULTI_STATUS;

	@ApiProperty({
		type: String,
		example: "multi-status",
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
		this.message = message ?? "multi-status";
		this.data = data;
	}
}
