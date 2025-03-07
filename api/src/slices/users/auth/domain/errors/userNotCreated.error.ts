import { BaseError } from '#core';
import { ErrorCodes } from './error.types';
import { HttpStatus } from '@nestjs/common';

export class UserNotCreatedError extends BaseError {
  public readonly code = ErrorCodes.USER_NOT_CREATED;
  public readonly statusCode = HttpStatus.BAD_REQUEST;

  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? `We couldn't create your user`;
  }
}
