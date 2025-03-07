import { Injectable } from '@nestjs/common';
import { IUsersGateway, IUsersFilter, IUserData, ICreateUserData, IUpdateUserData } from '../domain';
import { IMetaResponse } from '#core/domain';

@Injectable()
export class UsersService {
  constructor(private usersGateway: IUsersGateway) {}

  async getUsers(filter?: IUsersFilter): Promise<{ data: IUserData[]; meta: IMetaResponse }> {
    return await this.usersGateway.getUsers(filter);
  }

  async getUser(id: string) {
    return await this.usersGateway.getUser(id);
  }

  async getUserByEmail(email: string) {
    const { data } = await this.usersGateway.getUsers({ email: email });
    return data[0];
  }

  async createUser(data: ICreateUserData) {
    return await this.usersGateway.createUser(data);
  }

  async updateUser(id: string, data: IUpdateUserData) {
    return await this.usersGateway.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return await this.usersGateway.deleteUser(id);
  }
}
