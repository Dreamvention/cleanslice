import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '#prisma';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { AdminRoles } from './domain';
import { RoleTypes } from '../user/domain';
import { Reflector } from '@nestjs/core';
import { CoreGuard } from '../../core/core.guard';

@Injectable()
export class PermissionsGuard extends CoreGuard {
  constructor(
    private prisma: PrismaService,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { email: string };
      const userEmail = decoded.email;

      if (userEmail) {
        const user = await this.prisma.user.findFirst({ where: { email: userEmail } });

        if (user?.roles?.includes(RoleTypes.Admin)) {
          return true;
        }
      }
    } catch {
      throw new UnauthorizedException();
    }

    throw new UnauthorizedException();
  }

  protected async handleAuth(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.roles?.includes(RoleTypes.Admin)) {
      return true;
    }

    throw new UnauthorizedException();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
