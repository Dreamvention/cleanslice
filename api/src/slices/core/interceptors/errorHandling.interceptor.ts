import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from 'express';
import { BaseError } from '../errors';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Default error response
        const statusCode =
          error instanceof HttpException || error instanceof BaseError
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.response?.message || error.message || 'An unexpected error occurred';
        const errorCode = error.code || 'UNEXPECTED_ERROR';
        // Standardize error response
        const errorResponse = {
          code: errorCode,
          statusCode,
          message,
          timestamp: new Date().toISOString(),
          path: ctx.getRequest().url,
        };

        // Return the error response
        response.status(statusCode).json(errorResponse);

        // Alternatively, re-throw the error if you want it to be handled by an exception filter
        return throwError(() => error);
      }),
    );
  }
}
