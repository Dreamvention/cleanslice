import { injectable } from 'tsyringe';
import type { IUsersGateway } from '../../domain/gateways';
import type { IUserData } from '../../domain/entities';
import { UserMapper } from '../mappers';
import { ApiRepository } from '../repositories';

@injectable()
export class UsersGateway implements IUsersGateway {
  constructor(public readonly api: ApiRepository, public readonly map: UserMapper) {}

  async getUsers(): Promise<IUserData[]> {
    const data = await this.api.users.getUsers();
    return data.map((user) => this.map.toData(user));
  }
  getUser(id: number): Promise<IUserData> {
    throw new Error('Method not implemented.');
  }
  createUser(data: IUserData): Promise<IUserData> {
    throw new Error('Method not implemented.');
  }
  updateUser(id: number, data: IUserData): Promise<IUserData> {
    throw new Error('Method not implemented.');
  }
  deleteUsers(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
