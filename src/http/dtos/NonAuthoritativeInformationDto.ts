import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class NonAuthoritativeInformationDto<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.NON_AUTHORITATIVE_INFORMATION,
		description: "HTTP status code",
	})
	statusCode = HttpStatus.NON_AUTHORITATIVE_INFORMATION;

	@ApiProperty({
		example: "non-authoritative information",
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
		this.message =
			message ??
			"non-authoritative information";
		this.data = data;
	}
}
