# @wrk-t/ts-exc

Type-safe HTTP exception and response DTOs for NestJS.

Every HTTP status code as a typed class with Swagger `@ApiProperty` decorators,
middleware support, and a built-in generator to regenerate DTOs from a status-code map.

## Install

```bash
pnpm add @wrk-t/ts-exc
```

Peer dependencies:
- `@nestjs/common` ≥ 10
- `@nestjs/swagger` ≥ 7

## Usage

```ts
import { OkDto, CreatedDto, NotFoundDto, BadRequestDto } from "@wrk-t/ts-exc";

// In controllers:
@Get(":id")
async findById(@Param("id") id: string) {
  const result = await this.service.findById(id);
  if (!result) throw new NotFoundDto();
  return new OkDto(result);
}

@Post()
async create(@Body() data: CreateDto) {
  const result = await this.service.create(data);
  return new CreatedDto(result);
}
```

## Included DTOs

### Success (plain classes)
`OkDto`, `CreatedDto`, `AcceptedDto`, `NoContentDto`, `FoundDto`, `NotModifiedDto`, `ContinueDto`, `SwitchingProtocolsDto`, `ProcessingDto`, `EarlyhintsDto`, `NonAuthoritativeInformationDto`, `ResetContentDto`, `PartialContentDto`, `MultiStatusDto`, `AlreadyReportedDto`, `MovedPermanentlyDto`, `SeeOtherDto`, `TemporaryRedirectDto`, `PermanentRedirectDto`

### Errors (extend HttpException)
`BadRequestDto`, `UnauthorizedDto`, `ForbiddenDto`, `NotFoundDto`, `ConflictDto`, `InternalServerErrorDto`, `NotImplementedDto`, `BadGatewayDto`, `ServiceUnavailableDto`, `GatewayTimeoutDto`, `TooManyRequestsDto`, `UnprocessableEntityDto`, `MethodNotAllowedDto`, `NotAcceptableDto`, `RequestTimeoutDto`, `PayloadTooLargeDto`, `UnsupportedMediaTypeDto`, `GoneDto`, `PreconditionFailedDto`, `MisdirectedDto`, `LockedDto`, `FailedDependencyDto`, `PreconditionRequiredDto`, `RequestedRangeNotSatisfiableDto`, `ExpectationFailedDto`, `IAmATeapotDto`, `HttpVersionNotSupportedDto`, `InsufficientStorageDto`, `LoopDetectedDto`, `PaymentRequiredDto`, `ProxyAuthenticationRequiredDto`, `LengthRequiredDto`, `UriTooLongDto`

### Base classes
`HttpException`, `Exception`, `BaseException`, `ValidationErrorDto`

## Middleware

```ts
import { BaseException } from "@wrk-t/ts-exc";

BaseException.use((exc, next) => {
  console.log(`[${exc.name}] ${exc.message}`);
  next();
});
```

## Generator

Regenerate all DTO files from the status-code map:

```bash
pnpm generate:dtos
```

## License

MIT
