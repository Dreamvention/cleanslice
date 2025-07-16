import { PrismaService } from '#prisma';
import { IUserData } from '../../user/domain';
import { UserMapper } from '../../user/data/user.mapper';
import { Injectable } from '@nestjs/common';
import { ICreateTeamUserData, ITeamUserData, ITeamUserFilter, ITeamUserGateway, IUpdateTeamUserData } from '../domain';
import { TeamUserMapper } from './teamUser.mapper';
import { IMetaResponse } from '#core';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamUserGateway implements ITeamUserGateway {
  constructor(
    private prisma: PrismaService,
    private map: TeamUserMapper,
  ) {}

  async getTeamUsers(
    teamId: string,
    filter?: ITeamUserFilter,
  ): Promise<{ data: ITeamUserData[]; meta: IMetaResponse }> {
    const options: Prisma.TeamUserFindManyArgs = {
      where: {},
    };
    const team = await this.prisma.team.findFirst({
      where: {
        OR: [{ id: teamId }, { codename: teamId }],
      },
    });

    if (filter?.search) {
      options.where.OR = [
        {
          status: {
            contains: filter.search,
          },
        },
      ];
    }
    if (filter?.teamIds) {
      options.where.teamId = { in: filter.teamIds };
    }
    if (filter?.userIds) {
      options.where.userId = { in: filter.userIds };
    }
    if (filter?.userEmails) {
      options.where.email = { in: filter.userEmails };
    }
    if (filter.page && filter.perPage) {
      options.skip = (filter.page - 1) * filter.perPage;
      options.take = filter.perPage;
    }

    const results = await this.prisma.teamUser.findMany({
      where: { teamId: team.id },
    });

    const total = await this.prisma.teamUser.count({ where: options.where });

    if (results.length) {
      return {
        data: results.map((result) => this.map.toData(result)),
        meta: {
          total: total,
          lastPage: total / filter.perPage + (total % filter.perPage) > 0 ? 1 : 0,
          currentPage: filter.page ?? 1,
          perPage: filter.perPage ?? 20,
        },
      };
    } else {
      return { data: [], meta: {} };
    }
  }

  async getTeamUser(teamId: string, teamUserId: string): Promise<ITeamUserData> {
    const result = await this.prisma.teamUser.findFirst({ where: { id: teamUserId, teamId } });

    if (!result) {
      throw new Error('User not found');
    }

    return this.map.toData(result);
  }

  async createTeamUser(data: ICreateTeamUserData, userId: string): Promise<ITeamUserData> {
    const result = await this.prisma.teamUser.create({
      data: this.map.toCreate(data, userId),
    });
    return this.map.toData(result);
  }

  async updateTeamUser(teamUserId: string, teamId: string, data: IUpdateTeamUserData): Promise<ITeamUserData> {
    const user = await this.prisma.teamUser.findFirst({ where: { id: teamUserId, teamId } });
    if (!user) {
      throw new Error('User not found');
    }

    const result = await this.prisma.teamUser.update({
      where: {
        id: user.id,
      },
      data: this.map.toUpdate(data),
    });
    return this.map.toData(result);
  }

  async deleteTeamUser(teamUserId: string, teamId: string): Promise<boolean> {
    try {
      const user = await this.prisma.teamUser.findFirst({ where: { id: teamUserId, teamId } });
      if (!user) {
        throw new Error('User not found');
      }

      await this.prisma.teamUser.delete({ where: { id: user.id } });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
