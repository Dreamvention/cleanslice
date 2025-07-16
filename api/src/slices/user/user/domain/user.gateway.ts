import { IMetaResponse } from '#core';
import { IUserData, ICreateUserData, IUpdateUserData } from './user.types';

export abstract class IUserGateway {
  abstract getUsers(filter?: IUserFilter): Promise<{ data: IUserData[]; meta: IMetaResponse }>;
  abstract getUser(id: string): Promise<IUserData>;
  abstract createUser(data: ICreateUserData): Promise<IUserData>;
  abstract updateUser(id: string, data: IUpdateUserData): Promise<IUserData>;
  abstract deleteUser(id: string): Promise<boolean>;
}

export interface IUserFilter {
  search?: string;
  ids?: string[];
  email: string;
  page?: number;
  perPage?: number;
}
