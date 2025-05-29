export interface IUserData {
  id: string;
  name: string;
  email: string;
  emailConfirmed: boolean;
  emailError?: boolean;
  emailErrorDescription?: string;
  emailNotifications?: boolean;
  verified: boolean;
  roles: RoleTypes[];
  banned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateUserData {
  name: string;
  email: string;
  roles: RoleTypes[];
}

export interface IUpdateUserData {
  name?: string;
  verified?: boolean;
  roles?: RoleTypes[];
  banned?: boolean;
  emailError?: boolean;
  emailErrorDescription?: string;
  emailNotifications?: boolean;
}

export enum RoleTypes {
  User = 'user',
  Admin = 'admin',
}
