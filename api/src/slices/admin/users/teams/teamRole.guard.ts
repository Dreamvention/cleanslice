import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '#prisma';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TeamPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //get all permissions in controller
    const requiredPermissions = this.reflector.get<string[]>('rolePermissions', context.getHandler());
    //if endpoint have not decorator "@TeamPermissions" allow action
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const teamId = request.params.id;
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Token is missing');
    }

    let userEmail = '';
    try {
      const cognito = jwt.decode(token) as any;
      userEmail = cognito.email;
    }catch(e){
      throw new Error('Invalid token');
    }

    //user is owner?
    const user = await this.prisma.user.findFirst({ where: { email: userEmail } });
    try{
      const ownerTeamId = (await this.prisma.team.findFirst({where: {id: teamId}}))?.userId;
      if(ownerTeamId === user.id) {
        return true;
      }
    }catch(e){
      throw Error('Team not found!');
    }

    //if user is not owner, check permissions
    try{
      const userRoleId = (await this.prisma.teamUser.findFirst({where: {userId: user.id, teamId: teamId}}))?.roleId;
      const userPermissionsJson = (await this.prisma.role.findUnique({where: {id: userRoleId}}))?.permissions as string;
      const userPermissions = await JSON.parse(userPermissionsJson);
      return requiredPermissions.every((perm) => userPermissions.includes(perm));
    }catch(e){
      throw Error('Role or Team not found!');
    }


  }
}
