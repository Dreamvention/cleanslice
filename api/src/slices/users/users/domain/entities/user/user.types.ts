export interface IUserData {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends IUserData {
  readonly id?: number;
  readonly name?: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  validate();
}
