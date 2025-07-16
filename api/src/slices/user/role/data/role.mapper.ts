import DB, { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IRoleData, ICreateRoleData, IUpdateRoleData } from '../domain';
import { v4 as uuid } from 'uuid';

export type IRoleResponse = DB.Role;

export type IRoleCreateRequest = Prisma.XOR<Prisma.RoleCreateInput, Prisma.RoleUncheckedCreateInput>;
export type IRoleUpdateRequest = Prisma.XOR<Prisma.RoleUpdateInput, Prisma.RoleUncheckedUpdateInput>;

@Injectable()
export class RoleMapper {
  toData(data: IRoleResponse): IRoleData {
    return {
      id: data.id,
      name: data.name,
      permissions: JSON.parse(data.permissions),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toCreate(data: ICreateRoleData): IRoleCreateRequest {
    const id = `role-${uuid()}`;
    return {
      id: id,
      name: data.name,
      permissions: JSON.stringify(data.permissions),
    };
  }

  toUpdate(data: IUpdateRoleData): IRoleUpdateRequest {
    return {
      name: data.name,
      permissions: JSON.stringify(data.permissions),
    };
  }
}
