import { Injectable } from '@nestjs/common';
import DB, { Prisma } from '@prisma/client';
import { ICreateTeamUserData, ITeamUserData, IUpdateTeamUserData, TeamUserStatusTypes } from '../domain';
import { v4 as uuid } from 'uuid';

export type ITeamUserResponse = DB.TeamUser;
export type ITeamUserCreateRequest = Prisma.XOR<Prisma.TeamUserCreateInput, Prisma.TeamUserUncheckedCreateInput>;
export type ITeamUserUpdateRequest = Prisma.XOR<Prisma.TeamUserUpdateInput, Prisma.TeamUserUncheckedUpdateInput>;

@Injectable()
export class TeamUserMapper {
  constructor() {}

  toData(data: ITeamUserResponse): ITeamUserData {
    return {
      id: data.id,
      userId: data.userId,
      email: data.email,
      teamId: data.teamId,
      roleId: data.roleId,
      status: data.status as TeamUserStatusTypes,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toCreate(data: ICreateTeamUserData, userId: string): ITeamUserCreateRequest {
    const id = `team-user-${uuid()}`;
    return {
      id,
      userId: userId,
      email: data.email,
      teamId: data.teamId,
      roleId: data.roleId,
      status: data.status,
    };
  }

  toUpdate(data: IUpdateTeamUserData): ITeamUserUpdateRequest {
    const update: ITeamUserUpdateRequest = {};

    if (data.status) {
      update.status = data.status;
    }

    if (data.roleId) {
      update.roleId = data.roleId;
    }

    return update;
  }
}
