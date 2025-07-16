import { Injectable } from '@nestjs/common';
import { IUserGateway, IUserFilter, IUserData, ICreateUserData, IUpdateUserData } from '../domain';
import { IMetaResponse } from '#core/domain';

@Injectable()
export class UserService {
  constructor(private userGateway: IUserGateway) {}

  async getUsers(filter?: IUserFilter): Promise<{ data: IUserData[]; meta: IMetaResponse }> {
    return await this.userGateway.getUsers(filter);
  }

  async getUser(id: string) {
    return await this.userGateway.getUser(id);
  }

  async getUserByEmail(email: string) {
    const { data } = await this.userGateway.getUsers({ email: email });
    return data[0];
  }

  async createUser(data: ICreateUserData) {
    return await this.userGateway.createUser(data);
  }

  async updateUser(id: string, data: IUpdateUserData) {
    return await this.userGateway.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return await this.userGateway.deleteUser(id);
  }
}
