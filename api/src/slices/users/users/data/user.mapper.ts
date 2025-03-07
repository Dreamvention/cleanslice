import DB, { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IUserData, RoleTypes, ICreateUserData, IUpdateUserData } from '../domain';
import { v4 as uuid } from 'uuid';

export type IUserResponse = DB.User;

export type IUserCreateRequest = Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
export type IUserUpdateRequest = Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;

@Injectable()
export class UserMapper {
  toData(data: IUserResponse): IUserData {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      emailError: data.emailError,
      emailErrorDescription: data.emailErrorDescription,
      emailNotifications: data.emailNotifications,
      roles: data.roles as RoleTypes[],
      verified: data.verified,
      banned: data.banned,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toCreate(data: ICreateUserData): IUserCreateRequest {
    const id = `user-${uuid()}`;
    return {
      id,
      name: data.name,
      email: data.email,
      roles: data.roles,
    };
  }

  toUpdate(data: IUpdateUserData): IUserUpdateRequest {
    return {
      name: data.name,
      verified: data.verified,
      roles: data.roles,
      banned: data.banned,
      emailError: data.emailError ?? false,
      emailErrorDescription: data.emailErrorDescription ?? '',
      emailNotifications: data.emailNotifications ?? true,
    };
  }
}
