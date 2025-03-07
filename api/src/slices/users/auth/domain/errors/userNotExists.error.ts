import { BaseError } from '#core';
import { ErrorCodes } from './error.types';
import { HttpStatus } from '@nestjs/common';

export class UserNotExistsError extends BaseError {
  public readonly code = ErrorCodes.USER_NOT_EXISTS;
  public readonly statusCode = HttpStatus.FORBIDDEN;

  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? `This user does not exists.`;
  }
}
