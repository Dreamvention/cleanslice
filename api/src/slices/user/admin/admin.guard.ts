import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '#prisma';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { AdminRoles } from './domain';
import { RoleTypes } from '../user/domain';
import { Reflector } from '@nestjs/core';
import { CoreGuard } from '../../core/core.guard';

@Injectable()
export class AdminGuard extends CoreGuard {
  constructor(
    private prisma: PrismaService,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let userEmail = '';
    try {
      const decoded = jwt.decode(token) as any;
      userEmail = decoded.email;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const user = await this.prisma.user.findFirst({ where: { email: userEmail } });

      if (user?.roles?.includes(RoleTypes.Admin)) {
        return true;
      }
      throw new ForbiddenException('Admins only');
    } catch {
      throw new ForbiddenException('User not found');
    }
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
}
