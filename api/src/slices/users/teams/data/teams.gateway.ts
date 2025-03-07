import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ITeamsGateway, ITeamsFilter, ITeamData, ICreateTeamData, IUpdateTeamData } from '../domain';
import { TeamMapper } from './team.mapper';
import { PrismaService } from '#prisma';
import { IMetaResponse } from '#core/domain';

@Injectable()
export class TeamsGateway implements ITeamsGateway {
  constructor(
    private prisma: PrismaService,
    private map: TeamMapper,
  ) {}

  async getTeams(filter: ITeamsFilter): Promise<{ data: ITeamData[]; meta: IMetaResponse }> {
    const options: Prisma.TeamFindManyArgs = {
      where: {},
      include: {},
    };
    if (filter?.search) {
      options.where.OR = [
        {
          name: {
            contains: filter.search,
          },
        },
      ];
    }
    if (filter?.ids) {
      options.where.id = { in: filter.ids };
    }
    if (filter.page && filter.perPage) {
      options.skip = (filter.page - 1) * filter.perPage;
      options.take = filter.perPage;
    }

    const results = await this.prisma.team.findMany({
      where: options.where,
      include: options.include,
      skip: options?.skip,
      take: options?.take,
      orderBy: options?.orderBy,
    });

    const total = await this.prisma.team.count({ where: options.where });
    return {
      data: results.map((result) => this.map.toData(result)),
      meta: {
        total: total,
        lastPage: total / filter.perPage + (total % filter.perPage) > 0 ? 1 : 0,
        currentPage: filter.page ?? 1,
        perPage: filter.perPage ?? 20,
      },
    };
  }

  async getTeamsByUserId(userId: string, filter?: ITeamsFilter): Promise<{ data: ITeamData[]; meta: IMetaResponse }> {
    const options: Prisma.TeamFindManyArgs = {
      where: {
        userId: userId,
      },
      include: {},
    };
    if (filter?.search) {
      options.where.OR = [
        {
          name: {
            contains: filter.search,
          },
        },
      ];
    }
    if (filter?.ids) {
      options.where.id = { in: filter.ids };
    }
    if (filter.page && filter.perPage) {
      options.skip = (filter.page - 1) * filter.perPage;
      options.take = filter.perPage;
    }

    const results = await this.prisma.team.findMany({
      where: options.where,
      include: options.include,
      skip: options?.skip,
      take: options?.take,
      orderBy: options?.orderBy,
    });

    const total = await this.prisma.team.count({ where: options.where });
    return {
      data: results.map((result) => this.map.toData(result)),
      meta: {
        total: total,
        lastPage: Math.ceil(total / (filter.perPage ?? 20)),
        currentPage: filter.page ?? 1,
        perPage: filter.perPage ?? 20,
      },
    };
  }

  async getTeam(id: string): Promise<ITeamData | undefined> {
    const result = await this.prisma.team.findUnique({
      where: { id },
      include: {},
    });
    if (result) return this.map.toData(result);
  }

  async getTeamByCodename(codename: string): Promise<ITeamData | undefined> {
    const result = await this.prisma.team.findFirst({
      where: { codename },
      include: {},
    });

    if (result) return this.map.toData(result);
  }

  async createTeam(data: ICreateTeamData): Promise<ITeamData> {
    const result = await this.prisma.team.create({
      data: this.map.toCreate(data),
      include: {
        user: true,
      },
    });
    return this.map.toData(result);
  }

  async updateTeam(id: string, data: IUpdateTeamData): Promise<ITeamData> {
    const result = await this.prisma.team.update({
      where: { id },
      data: this.map.toUpdate(data),
      include: {},
    });
    return this.map.toData(result);
  }

  async deleteTeam(id: string): Promise<boolean> {
    try {
      await this.prisma.team.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
