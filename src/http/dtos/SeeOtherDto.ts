import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class SeeOtherDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.SEE_OTHER,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.SEE_OTHER;

	@ApiProperty({
		type: String,
		example: "see other",
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
		this.message = message ?? "see other";
		this.data = data;
	}
}
