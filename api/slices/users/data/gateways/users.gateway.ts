import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserData } from '../../domain/entities';
import { IUsersGateway } from '../../domain/gateways';
import { UserMapper } from '../mappers';

@Injectable()
export class UsersGateway implements IUsersGateway {
  constructor(private prisma: PrismaService, private map: UserMapper) {}

  async getUsers() {
    const results = await this.prisma.user.findMany();
    return results.map((result) => this.map.toData(result));
  }

  async getUser(id: number) {
    const result = await this.prisma.user.findUnique({ where: { id } });
    return this.map.toData(result);
  }

  async createUser(data: IUserData) {
    const result = await this.prisma.user.create({ data: this.map.toCreate(data) });
    return this.map.toData(result);
  }

  async updateUser(id: number, data: IUserData) {
    const result = await this.prisma.user.update({ where: { id }, data: this.map.toUpdate(data) });
    return this.map.toData(result);
  }

  async deleteUser(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
