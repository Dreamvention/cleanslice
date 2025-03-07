import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { IS_FLAT_RESPONSE } from '../decorators/FlatResponse.decorator';

export interface Response<T> {
  data?: T;
  success?: boolean;
  error?: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const isFlat = this.reflector.getAllAndOverride<boolean>(IS_FLAT_RESPONSE, [
      context.getHandler(),
      context.getClass(),
    ]);

    return next.handle().pipe(
      map((data) => {
        //TODO: Fix auth
        if (isFlat) return data;
        if (data?.isLastPage !== undefined) return { ...data, success: true };
        if (data?.meta !== undefined) return { ...data, success: true };
        return {
          data,
          success: true,
        };
      }),
    );
  }
}
