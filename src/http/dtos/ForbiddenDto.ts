import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ForbiddenDto extends HttpException {
  @ApiProperty({
    type: Number,
    example: HttpStatus.FORBIDDEN,
    description: "HTTP status code",
  })
  statusCode = HttpStatus.FORBIDDEN;

  @ApiProperty({
    type: String,
    example: "Forbidden",
    description: "Error Name",
  })
  error = "Forbidden";

  @ApiProperty({
    type: String,
    example: "forbidden",
    description: "Error message",
  })
  message = "forbidden";

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
    messageOrErrors: string | ValidationErrorDto[] = "errors.forbidden",
    errors?: ValidationErrorDto[],
  ) {
    const isArray = Array.isArray(messageOrErrors);
    super(
      HttpStatus.FORBIDDEN,
      isArray ? "errors.forbidden" : messageOrErrors,
      isArray ? messageOrErrors : errors,
    );
  }
}
