import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class AcceptedDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.ACCEPTED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.ACCEPTED;

	@ApiProperty({
		type: String,
		example: "accepted",
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
		this.message = message ?? "accepted";
		this.data = data;
	}
}
