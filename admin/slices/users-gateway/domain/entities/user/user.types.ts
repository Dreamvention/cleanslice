export interface IUserData {
  id?: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IUserData {}
