import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class SwitchingProtocolsDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.SWITCHING_PROTOCOLS,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.SWITCHING_PROTOCOLS;

	@ApiProperty({
		type: String,
		example: "switching protocols",
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
		this.message = message ?? "switching protocols";
		this.data = data;
	}
}
