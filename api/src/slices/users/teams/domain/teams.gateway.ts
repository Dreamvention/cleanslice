import { IMetaResponse } from '#core/domain';
import { ITeamData, ICreateTeamData, IUpdateTeamData } from './team.types';

export abstract class ITeamsGateway {
  abstract getTeams(filter?: ITeamsFilter): Promise<{ data: ITeamData[]; meta: IMetaResponse }>;
  abstract getTeamsByUserId(userId: string, filter?: ITeamsFilter): Promise<{ data: ITeamData[]; meta: IMetaResponse }>;
  abstract getTeam(id: string): Promise<ITeamData>;
  abstract getTeamByCodename(codename: string): Promise<ITeamData>;
  abstract createTeam(data: ICreateTeamData): Promise<ITeamData>;
  abstract updateTeam(id: string, data: IUpdateTeamData): Promise<ITeamData>;
  abstract deleteTeam(id: string): Promise<boolean>;
}

export interface ITeamsFilter {
  search?: string;
  ids?: string[];
  page?: number;
  perPage?: number;
}
