import type { IUserData } from '../entities';
export interface IUsersGateway {
  getUsers(): Promise<IUserData[]>;
  getUser(id: number): Promise<IUserData>;
  createUser(data: IUserData): Promise<IUserData>;
  updateUser(id: number, data: IUserData): Promise<IUserData>;
  deleteUsers(id: number): Promise<boolean>;
}
