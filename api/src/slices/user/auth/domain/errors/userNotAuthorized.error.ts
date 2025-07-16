import { BaseError } from '#core';
import { ErrorCodes } from './error.types';
import { HttpStatus } from '@nestjs/common';

export class UserNotAuthorizedError extends BaseError {
  public readonly code = ErrorCodes.USER_NOT_AUTHORIZED;
  public readonly statusCode = HttpStatus.BAD_REQUEST;

  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? `Username or password was incorrect.`;
  }
}
