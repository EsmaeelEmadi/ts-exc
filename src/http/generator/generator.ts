import { writeFileSync } from "node:fs";
import path from "node:path";
// @ts-expect-error
import { constantCase, pascalCase } from "case-anything";
import { errors, successes } from "./httpStatuses";

const generate = () => {
  for (const [key, value] of Object.entries(errors)) {
    const name = pascalCase(key);
    const className = `${name}Dto`;
    const nestHttpErrorName = constantCase(key);

    const tmpl = `import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException } from "../base/HttpException";
import { ValidationErrorDto } from "../base/ValidationErrorDto";

export class ${className} extends HttpException {
	@ApiProperty({
		type: Number,
		example: HttpStatus.${nestHttpErrorName},
		description: "HTTP status code",
	})
	statusCode = HttpStatus.${nestHttpErrorName};

	@ApiProperty({
		type: String,
		example: "${name}",
		description: "Error Name",
	})
	error = "${name}";

	@ApiProperty({
		type: String,
		example: "${value}",
		description: "Error message",
	})
	message = "${value}";

	@ApiProperty({
		description: "Additional error details",
		required: false,
		type: [ValidationErrorDto]
	})
	errors?: ValidationErrorDto[];

	constructor(errors: ValidationErrorDto[]);
	constructor(message: string, errors?: ValidationErrorDto[]);
	constructor(
		messageOrErrors: string | ValidationErrorDto[] = "errors.${key}",
		errors?: ValidationErrorDto[],
	) {
		const isArray = Array.isArray(messageOrErrors);
		super(
			HttpStatus.${nestHttpErrorName},
			isArray ? "errors.${key}" : messageOrErrors,
			isArray ? messageOrErrors : errors,
		);
	}
}
`;

    writeFileSync(path.join(__dirname, `../dtos/${className}.ts`), tmpl, {
      encoding: "utf8",
    });
  }

  for (const [key, value] of Object.entries(successes)) {
    const className = `${pascalCase(key)}Dto`;
    const nestHttpErrorName = constantCase(key);

    const tmpl = `import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ${className}<T = unknown> {
	@ApiProperty({
		type: Number,
		example: HttpStatus.${nestHttpErrorName},
		description: "HTTP status code",
	})
	statusCode = HttpStatus.${nestHttpErrorName};

	@ApiProperty({
		type: String,
		example: "${value}",
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
		this.message = message ?? "${value}";
		this.data = data;
	}
}
`;

    writeFileSync(path.join(__dirname, `../dtos/${className}.ts`), tmpl, {
      encoding: "utf8",
    });
  }
};

generate();
