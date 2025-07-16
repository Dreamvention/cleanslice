import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyService } from './domain';
import { Request } from 'express';
import { CoreGuard } from '../../core/core.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeysGuard extends CoreGuard {
  constructor(
    private apiKeysService: ApiKeyService,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  protected async handleAuth(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = this.extractApiKeyFromHeader(request);
    if (key) {
      const apiKey = await this.apiKeysService.useApiKey(key, request.headers.origin);

      if (!apiKey) throw new UnauthorizedException('Invalid API key');
      request['team'] = apiKey.team;
      return true;
    }

    return false;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    return request.headers['api-key'] as string;
  }
}
