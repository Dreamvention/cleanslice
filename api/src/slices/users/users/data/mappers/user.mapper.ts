import { IUserData } from '../../domain/entities';
import DB, { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

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
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toCreate(data: IUserData): IUserCreateRequest {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
    };
  }

  toUpdate(data: IUserData): IUserUpdateRequest {
    return {
      name: data.name,
      email: data.email,
    };
  }
}
