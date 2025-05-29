import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { ApiKeyGuard } from './apiKeys/apiKey.guard';
import { CoreGuard } from '../core/core.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UsersGuard extends CoreGuard {
  constructor(
    private readonly authGuard: AuthGuard,
    private readonly apiKeyGuard: ApiKeyGuard,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  protected async handleAuth(context: ExecutionContext): Promise<boolean> {
    try {
      // Try JWT auth first
      return await this.executeAuthCheck(this.authGuard, context);
    } catch (e) {
      console.log('auth guard failed, trying api key', e);
      try {
        // If JWT fails, try API key
        return await this.executeAuthCheck(this.apiKeyGuard, context);
      } catch (e) {
        console.log('api key guard failed', e);
        throw new UnauthorizedException();
      }
    }
  }
}
