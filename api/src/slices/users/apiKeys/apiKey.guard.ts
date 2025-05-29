import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ApiKeysService } from './domain';
import { CoreGuard } from '../../core/core.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeyGuard extends CoreGuard {
  constructor(
    private apiKeysService: ApiKeysService,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  protected async handleAuth(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = this.extractApiKeyFromHeader(request);

    if (!key) {
      throw new UnauthorizedException();
    }

    try {
      const apiKey = await this.apiKeysService.useApiKey(key, request.headers.origin);
      request['team'] = apiKey.team;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    return request.headers['api-key'] as string;
  }
}
