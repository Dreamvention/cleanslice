import { IUserData } from '../entities';

export abstract class IUsersGateway {
  abstract getUsers(): Promise<IUserData[]>;
  abstract getUser(id: number): Promise<IUserData>;
  abstract createUser(data: IUserData): Promise<IUserData>;
  abstract updateUser(id: number, data: IUserData): Promise<IUserData>;
  abstract deleteUser(id: number): Promise<Boolean>;
}
