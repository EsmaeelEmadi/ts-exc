import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class MovedPermanentlyDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.MOVED_PERMANENTLY,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.MOVED_PERMANENTLY;

	@ApiProperty({
		type: String,
		example: "moved permanently",
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
		this.message = message ?? "moved permanently";
		this.data = data;
	}
}
