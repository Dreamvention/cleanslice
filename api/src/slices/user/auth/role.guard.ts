import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './role.decorator';
import { RoleTypes } from '../user/domain';
import { PrismaService } from '#prisma/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private db: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleTypes[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user, cognito_user } = context.switchToHttp().getRequest();
    const currentUser = await this.db.user.findFirst({
      where: {
        email: {
          equals: user?.email ?? cognito_user.email,
          mode: 'insensitive',
        },
      },
    });

    return requiredRoles.some((role) => currentUser.roles?.includes(role));
  }
}
