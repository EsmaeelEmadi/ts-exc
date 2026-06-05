import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class FoundDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.FOUND,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.FOUND;

	@ApiProperty({
		type: String,
		example: "found",
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
		this.message = message ?? "found";
		this.data = data;
	}
}
