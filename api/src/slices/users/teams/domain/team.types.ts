import { IUserData } from '#users/users';

export interface ITeamData {
  id: string;
  codename: string;
  name: string;
  userId: string;
  // user?: IUserData;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateTeamData {
  userId: string;
  name: string;
  codename: string;
}

export interface IUpdateTeamData {
  name: string;
  codename: string;
}
