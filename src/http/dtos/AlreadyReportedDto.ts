import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class AlreadyReportedDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.ALREADY_REPORTED,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.ALREADY_REPORTED;

	@ApiProperty({
		type: String,
		example: "already reported",
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
		this.message = message ?? "already reported";
		this.data = data;
	}
}
