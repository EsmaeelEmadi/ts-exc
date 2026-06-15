import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class InternalServerErrorDto extends HttpException {
  @ApiProperty({
    type: Number,
    example: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "HTTP status code",
  })
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  @ApiProperty({
    type: String,
    example: "InternalServerError",
    description: "Error Name",
  })
  error = "InternalServerError";

  @ApiProperty({
    type: String,
    example: "internal server error",
    description: "Error message",
  })
  message = "internal server error";

  @ApiProperty({
    description: "Additional error details",
    required: false,
    type: [ValidationErrorDto],
  })
  errors?: ValidationErrorDto[];

  constructor();
  constructor(errors: ValidationErrorDto[]);
  constructor(message: string, errors?: ValidationErrorDto[]);
  constructor(
    messageOrErrors:
      | string
      | ValidationErrorDto[] = "errors.internal_server_error",
    errors?: ValidationErrorDto[],
  ) {
    const isArray = Array.isArray(messageOrErrors);
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      isArray ? "errors.internal_server_error" : messageOrErrors,
      isArray ? messageOrErrors : errors,
    );
  }
}
