import { BaseError } from '#core';
import { ErrorCodes } from './error.types';
import { HttpStatus } from '@nestjs/common';

export class UserNotVerifiedError extends BaseError {
  public readonly code = ErrorCodes.USER_NOT_VERIFIED;
  public readonly statusCode = HttpStatus.FORBIDDEN;

  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? `User is yet verified.`;
  }
}
