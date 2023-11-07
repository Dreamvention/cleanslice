import { injectable } from 'tsyringe';
import { IUsersGateway } from '../gateways';
import { User, IUserData } from '../entities';

@injectable()
export class UsersService {
  constructor(public gateway: IUsersGateway) {}

  async getUsers() {
    const result = await this.gateway.getUsers();
    return result.map((user) => new User(user));
  }

  async getUser(id: number) {
    const result = await this.gateway.getUser(id);
    return new User(result);
  }

  async createUser(data: IUserData) {
    const result = await this.gateway.createUser(data);
    return new User(result);
  }

  async updateUser(id: number, data: IUserData) {
    const result = await this.gateway.updateUser(id, data);
    return new User(result);
  }

  async deleteUsers(id: number) {
    return await this.gateway.deleteUsers(id);
  }
}
