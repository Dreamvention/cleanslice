import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../users/auth/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export abstract class CoreGuard implements CanActivate {
  constructor(protected reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return this.handleAuth(context);
  }

  protected abstract handleAuth(context: ExecutionContext): Promise<boolean>;

  protected async executeAuthCheck(guard: CoreGuard, context: ExecutionContext): Promise<boolean> {
    return guard.handleAuth(context);
  }
}
