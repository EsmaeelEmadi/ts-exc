import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class OkDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.OK,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.OK;

	@ApiProperty({
		type: String,
		example: "ok",
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
		this.message = message ?? "ok";
		this.data = data;
	}
}
