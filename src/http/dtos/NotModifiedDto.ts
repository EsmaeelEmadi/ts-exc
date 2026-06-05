import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class NotModifiedDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.NOT_MODIFIED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.NOT_MODIFIED;

	@ApiProperty({
		type: String,
		example: "not modified",
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
		this.message = message ?? "not modified";
		this.data = data;
	}
}
