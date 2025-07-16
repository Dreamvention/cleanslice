import { Injectable } from '@nestjs/common';
import { ICreateRoleData, IRoleData, IUpdateRoleData } from './role.types';
import { IRoleGateway } from './role.gateway';

@Injectable()
export class RoleService {
  constructor(private readonly roleGateway: IRoleGateway) {}

  async getRoles(): Promise<IRoleData[]> {
    return this.roleGateway.getRoles();
  }

  async getRole(id: string): Promise<IRoleData> {
    if (!id) {
      throw new Error('Role ID is required to fetch a role.');
    }
    return this.roleGateway.getRole(id);
  }

  async createRole(data: ICreateRoleData): Promise<IRoleData> {
    if (!data.name) {
      throw new Error('Role name is required to create a role.');
    }

    return this.roleGateway.createRole(data);
  }

  async updateRole(id: string, data: IUpdateRoleData): Promise<IRoleData> {
    if (!id) {
      throw new Error('Team ID is required to update a team.');
    }
    if (!data) {
      throw new Error('Update data is required.');
    }
    return this.roleGateway.updateRole(id, data);
  }

  async deleteRole(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('Role ID is required to delete a role.');
    }
    return this.roleGateway.deleteRole(id);
  }
}
