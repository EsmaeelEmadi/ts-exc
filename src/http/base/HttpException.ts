import { HttpExceptionOptions, HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exception } from "../../core/exceptions";
import { ValidationErrorDto } from "./ValidationErrorDto";

export class HttpException extends Exception {
  @ApiProperty({
    type: String,
    example: "Bad Request",
    description: "Error type",
  })
  message!: string;

  constructor(
    status: HttpStatus,
    error = "",
    errors?: ValidationErrorDto[],
    options?: HttpExceptionOptions,
  ) {
    const responseBody = {
      statusCode: status,
      message: error,
      ...(errors && { errors }),
    };

    super(responseBody, status, options);
  }
}
