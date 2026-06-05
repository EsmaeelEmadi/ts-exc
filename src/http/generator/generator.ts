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
		example: HttpStatus.${nestHttpErrorName},
		description: "HTTP status code",
	})
	statusCode = HttpStatus.${nestHttpErrorName};

	@ApiProperty({
		example: "${name}",
		description: "Error Name",
	})
	error = "${name}";

	@ApiProperty({
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

	constructor(errors?: ValidationErrorDto[] | string) {
		const defaultMessage = "${value}";
		if (typeof errors === "string") {
			super(HttpStatus.${nestHttpErrorName}, errors ?? defaultMessage);
		} else {
			super(HttpStatus.${nestHttpErrorName}, defaultMessage, errors);
		}
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
		example: HttpStatus.${nestHttpErrorName},
		description: "HTTP status code",
	})
	statusCode = HttpStatus.${nestHttpErrorName};

	@ApiProperty({
		example: "${value}",
		description: "Success message",
	})
	message: string;

	@ApiProperty({
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

// import { writeFileSync } from "node:fs";
// import path from "node:path";
// // @ts-expect-error
// import { constantCase, pascalCase } from "case-anything";
// import { errors, successes } from "./httpStatuses";
//
// const generate = () => {
// 	for (const [key, value] of Object.entries(errors)) {
// 		const className = `${pascalCase(key)}Dto`;
// 		const nestHttpErrorName = constantCase(key);
//
// 		const tmpl = `
// 			import { HttpStatus } from "@nestjs/common";
// 			import { ApiProperty } from "@nestjs/swagger";
// 			import { I18nContext } from "nestjs-i18n";
// 			import { I18nTranslations } from "src/generated/i18n.generated";
// 			import { HttpException } from "../base/HttpException";
//
// 			export class ${className} extends HttpException {
// 				@ApiProperty({
// 					example: HttpStatus.${nestHttpErrorName},
// 					description: "${value}",
// 					name: "status"
// 				})
// 				statusCode = HttpStatus.${nestHttpErrorName};
//
// 				@ApiProperty({
// 					example: "${value}",
// 				})
// 				error = "${value}";
//
// 				constructor(message?: string) {
// 					const i18n = I18nContext.current<I18nTranslations>();
// 					const defaultMessage = i18n?.t("errors.${key}") ?? "";
// 					super(HttpStatus.${nestHttpErrorName}, defaultMessage);
// 					// @ts-expect-error
// 					this.message = message;
// 				}
// 			}
// 			`;
//
// 		writeFileSync(path.join(__dirname, `../dtos/${className}.ts`), tmpl, {
// 			encoding: "utf8",
// 		});
// 	}
//
// 	for (const [key, value] of Object.entries(successes)) {
// 		const className = `${pascalCase(key)}Dto`;
// 		const nestHttpErrorName = constantCase(key);
//
// 		const tmpl = `
// 			import { HttpStatus } from "@nestjs/common";
// 			import { ApiProperty } from "@nestjs/swagger";
// 			import { I18nContext } from "nestjs-i18n";
// 			import { I18nTranslations } from "src/generated/i18n.generated";
//
// 			export class ${className}<T> {
// 				@ApiProperty({
// 					example: HttpStatus.${nestHttpErrorName},
// 					description: "${value}",
// 					name: "status"
// 				})
// 				statusCode = HttpStatus.${nestHttpErrorName};
//
// 				@ApiProperty({
// 					example: "${value}",
// 				})
// 				message?: string = "${value}";
//
// 				@ApiProperty()
// 				response?: T;
//
// 				constructor(response?: T) {
// 					const i18n = I18nContext.current<I18nTranslations>();
// 					this.message = i18n?.t("errors.${key}");
// 					this.response = response;
// 				}
// 			}
// 			`;
//
// 		writeFileSync(path.join(__dirname, `../dtos/${className}.ts`), tmpl, {
// 			encoding: "utf8",
// 		});
// 	}
// };
//
// generate();
