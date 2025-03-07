import { Injectable } from '@nestjs/common';
import { ITeamsGateway, ITeamsFilter } from './';
import { ITeamData, ICreateTeamData, IUpdateTeamData } from './team.types';
import { IMetaResponse } from '#core/domain';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsGateway: ITeamsGateway) {}

  async getTeams(filter?: ITeamsFilter): Promise<{ data: ITeamData[]; meta: IMetaResponse }> {
    return this.teamsGateway.getTeams(filter);
  }

  async getTeamsByUserId(userId: string, filter?: ITeamsFilter): Promise<{ data: ITeamData[]; meta: IMetaResponse }> {
    return this.teamsGateway.getTeamsByUserId(userId, filter);
  }

  async getTeam(id: string): Promise<ITeamData> {
    if (!id) {
      throw new Error('Team ID is required to fetch a team.');
    }
    return this.teamsGateway.getTeam(id);
  }

  async getTeamByCodename(codename: string): Promise<ITeamData> {
    if (!codename) {
      throw new Error('Team Codename is required to fetch a team.');
    }
    return this.teamsGateway.getTeamByCodename(codename);
  }

  async getTeamByIdOrCodename(idOrCodename: string): Promise<ITeamData> {
    if (!idOrCodename) {
      throw new Error('Team ID or Codename is required to fetch a team.');
    }

    if (idOrCodename.length == 41) {
      return this.teamsGateway.getTeam(idOrCodename);
    } else {
      //The Codename can not be longer then 20 symbols
      return this.teamsGateway.getTeamByCodename(idOrCodename);
    }
  }

  async createTeam(data: ICreateTeamData): Promise<ITeamData> {
    if (!data.name) {
      throw new Error('Team name is required to create a team.');
    }

    const validation = await this.validateCodename(data.codename);
    if (!validation.valid) {
      throw new Error(validation.error); // Or use a custom ValidationError
    }

    return this.teamsGateway.createTeam(data);
  }

  async updateTeam(id: string, data: IUpdateTeamData): Promise<ITeamData> {
    if (!id) {
      throw new Error('Team ID is required to update a team.');
    }
    if (!data) {
      throw new Error('Update data is required.');
    }
    const validation = await this.validateCodename(data.codename);
    if (!validation.valid) {
      throw new Error(validation.error); // Or use a custom ValidationError
    }
    return this.teamsGateway.updateTeam(id, data);
  }

  async deleteTeam(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('Team ID is required to delete a team.');
    }
    return this.teamsGateway.deleteTeam(id);
  }

  async validateCodename(codename) {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 20;
    const regex = /^[a-z0-9]+(-[a-z0-9]+)*$/;

    if (typeof codename !== 'string') {
      return { valid: false, error: 'Codename must be a string' };
    }

    if (codename.length < MIN_LENGTH || codename.length > MAX_LENGTH) {
      return { valid: false, error: `Codename must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters` };
    }

    if (!regex.test(codename)) {
      return {
        valid: false,
        error:
          'Codename can only contain lowercase letters, numbers, and hyphens, but must not start or end with a hyphen or contain consecutive hyphens',
      };
    }

    if (await this.teamsGateway.getTeamByCodename(codename)) {
      return {
        valid: false,
        error: `Codename ${codename} already exists`,
      };
    }

    return { valid: true };
  }
}
