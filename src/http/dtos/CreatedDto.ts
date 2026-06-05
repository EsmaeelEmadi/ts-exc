import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CreatedDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.CREATED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.CREATED;

	@ApiProperty({
		type: String,
		example: "created",
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
		this.message = message ?? "created";
		this.data = data;
	}
}
