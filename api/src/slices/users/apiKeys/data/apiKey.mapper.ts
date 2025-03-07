import DB, { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IApiKeyData, ICreateApiKeyData, IUpdateApiKeyData } from '../domain';
import { TeamMapper } from '#users/teams';
import { v4 as uuid } from 'uuid';

export type IApiKeyResponse = DB.ApiKey & {
  team: DB.Team;
};

export type IApiKeyCreateRequest = Prisma.XOR<Prisma.ApiKeyCreateInput, Prisma.ApiKeyUncheckedCreateInput>;
export type IApiKeyUpdateRequest = Prisma.XOR<Prisma.ApiKeyUpdateInput, Prisma.ApiKeyUncheckedUpdateInput>;

@Injectable()
export class ApiKeyMapper {
  constructor(private readonly teamMapper: TeamMapper) {}
  toData(data: IApiKeyResponse): IApiKeyData {
    return {
      id: data.id,
      teamId: data.teamId,
      team: this.teamMapper.toData(data.team),
      name: data.name,
      secret: data.secret,
      lastUsedAt: data.lastUsedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toCreate(data: ICreateApiKeyData): IApiKeyCreateRequest {
    const id = `api-key-${uuid()}`;
    const secret = `secret-${uuid()}`;

    return {
      id,
      team: { connect: { id: data.teamId } },
      name: data.name,
      secret,
      lastUsedAt: new Date(),
    };
  }

  toUpdate(data: IUpdateApiKeyData): IApiKeyUpdateRequest {
    return {
      name: data.name,
    };
  }
}
