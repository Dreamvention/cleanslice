import { IUserData } from '../entities';

export abstract class IUsersGateway {
  abstract getUsers(filter?: IUsersFilter): Promise<IUserData[]>;
  abstract getUser(id: number): Promise<IUserData>;
  abstract createUser(data: IUserData): Promise<IUserData>;
  abstract updateUser(id: number, data: IUserData): Promise<IUserData>;
  abstract deleteUser(id: number): Promise<boolean>;
}

export interface IUsersFilter {
  email: string;
}
