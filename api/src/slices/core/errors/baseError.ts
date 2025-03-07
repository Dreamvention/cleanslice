/**
 * Standard JS Error has options to pass cause parameter, often another Error
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#differentiate_between_similar_errors
 */
import { ErrorCodes } from './domainError.types';

export abstract class BaseError extends Error {
  public cause: Error | undefined;
  public code = ErrorCodes.UNEXPECTED_ERROR;
  public statusCode = 500;

  constructor(message?: string, options?: { cause?: Error }) {
    super(message);
    this.cause = options?.cause;
    this.name = this.constructor.name;
    // Object.setPrototypeOf(this, BaseError.prototype);
  }

  getStatus() {
    return this.statusCode;
  }

  getCause() {
    if (this.cause) return this.cause;
    return new Error();
  }
}
