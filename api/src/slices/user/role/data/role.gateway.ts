import { Injectable } from '@nestjs/common';
import { PrismaService } from '#prisma';
import { IRoleGateway, IRoleData, ICreateRoleData, IUpdateRoleData } from '../domain';
import { RoleMapper } from './role.mapper';

@Injectable()
export class RoleGateway implements IRoleGateway {
  constructor(
    private prisma: PrismaService,
    private map: RoleMapper,
  ) {}

  async getRoles(): Promise<IRoleData[]> {
    const results = await this.prisma.role.findMany();
    return results.map((result) => this.map.toData(result));
  }

  async getRole(id: string) {
    const result = await this.prisma.role.findUnique({ where: { id } });
    return this.map.toData(result);
  }

  async createRole(data: ICreateRoleData) {
    const result = await this.prisma.role.create({ data: this.map.toCreate(data) });
    return this.map.toData(result);
  }

  async updateRole(id: string, data: IUpdateRoleData) {
    const result = await this.prisma.role.update({ where: { id }, data: this.map.toUpdate(data) });
    return this.map.toData(result);
  }

  async deleteRole(id: string) {
    try {
      await this.prisma.role.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
