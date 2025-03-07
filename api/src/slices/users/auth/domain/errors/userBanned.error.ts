import { BaseError } from '#core';
import { ErrorCodes } from './error.types';
import { HttpStatus } from '@nestjs/common';

export class UserBannedError extends BaseError {
  public readonly code = ErrorCodes.USER_BANNED;
  public readonly statusCode = HttpStatus.FORBIDDEN;

  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? `User is banned.`;
  }
}
