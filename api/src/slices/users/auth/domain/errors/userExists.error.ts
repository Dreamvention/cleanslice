import { BaseError } from '#core';
import { ErrorCodes } from './error.types';
import { HttpStatus } from '@nestjs/common';

export class UserExistsError extends BaseError {
  public readonly code = ErrorCodes.USER_EXISTS;
  public readonly statusCode = HttpStatus.CONFLICT;

  constructor(message?: string | undefined, options?: { cause: Error }) {
    super(message, options);
    this.message = message ?? 'User already exists';
  }
}
