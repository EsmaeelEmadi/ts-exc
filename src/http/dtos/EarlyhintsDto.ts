import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class EarlyhintsDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.EARLYHINTS,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.EARLYHINTS;

	@ApiProperty({
		type: String,
		example: "early hints",
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
		this.message = message ?? "early hints";
		this.data = data;
	}
}
