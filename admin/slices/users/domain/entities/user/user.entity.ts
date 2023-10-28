import type { IUser, IUserData } from './user.types';

export class User implements IUser {
  id?: number;
  name: string = '';
  email: string = '';
  role: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  constructor(data: IUserData) {
    Object.assign(this, data);
  }
}
