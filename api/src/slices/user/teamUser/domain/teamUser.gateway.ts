import { ICreateTeamUserData, ITeamUserData, IUpdateTeamUserData } from '../domain';
import { IUserData } from '../../user/domain';
import { IMetaResponse } from '#core';

export abstract class ITeamUserGateway {
  abstract getTeamUsers(id: string, filter?: ITeamUserFilter): Promise<{ data: ITeamUserData[]; meta: IMetaResponse }>;
  abstract getTeamUser(teamId: string, teamUserId: string): Promise<ITeamUserData>;
  abstract createTeamUser(data: ICreateTeamUserData, userId: string): Promise<ITeamUserData>;
  abstract updateTeamUser(teamUserId: string, teamId: string, data: IUpdateTeamUserData);
  abstract deleteTeamUser(teamUserId: string, teamId: string): Promise<boolean>;
}

export interface ITeamUserFilter {
  search?: string;
  teamIds?: string[];
  userIds?: string[];
  userEmails?: string[];
  page?: number;
  perPage?: number;
}
