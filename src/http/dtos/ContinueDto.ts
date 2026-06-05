import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ContinueDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.CONTINUE,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.CONTINUE;

	@ApiProperty({
		type: String,
		example: "continue",
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
		this.message = message ?? "continue";
		this.data = data;
	}
}
