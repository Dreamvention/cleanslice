import { IUser, IUserData } from './user.types';

export class User implements IUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data: IUserData) {
    Object.assign(this, data);
  }

  validate() {
    throw new Error('Method not implemented.');
  }
}
