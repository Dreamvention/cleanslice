import { BaseError } from '#core';
import { ErrorCodes } from './error.types';
import { HttpStatus } from '@nestjs/common';

export class UserNotConfirmedError extends BaseError {
  public readonly code = ErrorCodes.USER_NOT_CONFIRMED;
  public readonly statusCode = HttpStatus.FORBIDDEN;

  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? `User not confirmed`;
  }
}
