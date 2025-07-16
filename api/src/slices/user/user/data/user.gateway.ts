import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IUserGateway, IUserFilter, IUserData, ICreateUserData, IUpdateUserData } from '../domain';
import { UserMapper } from './user.mapper';
import { PrismaService } from '#prisma';
import { IMetaResponse } from '#core/domain';

@Injectable()
export class UserGateway implements IUserGateway {
  constructor(
    private prisma: PrismaService,
    private map: UserMapper,
  ) {}

  async getUsers(filter?: IUserFilter): Promise<{ data: IUserData[]; meta: IMetaResponse }> {
    const options: Prisma.UserFindManyArgs = {
      where: {},
      include: { teams: true },
    };
    if (filter?.email) {
      options.where.email = filter.email;
    }
    if (filter?.search) {
      options.where.OR = [
        {
          name: {
            contains: filter.search,
          },
        },
        {
          email: {
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
    const results = await this.prisma.user.findMany({
      ...options,
      include: { teams: true },
    });
    const total = await this.prisma.user.count({ where: options.where });
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

  async getUser(id: string) {
    const result = await this.prisma.user.findUnique({ where: { id }, include: { teams: true } });
    return this.map.toData(result);
  }

  async createUser(data: ICreateUserData) {
    const result = await this.prisma.user.create({ include: { teams: true }, data: this.map.toCreate(data) });
    return this.map.toData(result);
  }

  async updateUser(id: string, data: IUpdateUserData) {
    const result = await this.prisma.user.update({
      where: { id },
      include: { teams: true },
      data: this.map.toUpdate(data),
    });
    return this.map.toData(result);
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
