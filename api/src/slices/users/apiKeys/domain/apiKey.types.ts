import { ITeamData } from '#users/teams';

export interface IApiKeyData {
  id: string;
  teamId: string;
  team?: ITeamData;
  name: string;
  secret: string;
  lastUsedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateApiKeyData {
  teamId: string;
  name: string;
}

export interface IUpdateApiKeyData {
  name: string;
}
