import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { IAuthGateway } from './domain';
import { CoreGuard } from '../../core/core.guard';
import { Reflector } from '@nestjs/core';

export interface IRequestWithAuth extends Request {
  user: { id: string };
}

@Injectable()
export class AuthGuard extends CoreGuard {
  constructor(
    private authGateway: IAuthGateway,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  protected async handleAuth(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.authGateway.verifyToken(token);
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
