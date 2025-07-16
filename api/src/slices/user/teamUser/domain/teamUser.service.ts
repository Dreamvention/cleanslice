import { Injectable } from '@nestjs/common';
import { ITeamUserFilter, ITeamUserGateway } from './teamUser.gateway';
import { ICreateTeamUserData, ITeamUserData, IUpdateTeamUserData, TeamUserStatusTypes } from './teamUser.types';
import { IMetaResponse } from '#core';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TeamUserService {
  constructor(
    private readonly teamUserGateway: ITeamUserGateway,
    private readonly prisma: PrismaService,
  ) {}
  //TODO: add filter for teamUsers
  async getTeamUsers(id: string, filter?: ITeamUserFilter): Promise<{ data: ITeamUserData[]; meta: IMetaResponse }> {
    return this.teamUserGateway.getTeamUsers(id, filter);
  }

  async getTeamUser(teamId: string, teamUserId: string): Promise<ITeamUserData> {
    return this.teamUserGateway.getTeamUser(teamId, teamUserId);
  }

  async createTeamUser(data: ICreateTeamUserData): Promise<ITeamUserData> {
    const team = await this.prisma.team.findUnique({ where: { id: data.teamId } });
    if (!team) {
      throw new Error('Team not found');
    }

    const user = await this.prisma.user.findFirst({ where: { email: data.email } });
    const userId = user?.id || null;

    if (team.userId === userId) {
      throw new Error('User is the owner of the team');
    }

    if (userId !== null) {
      const existingTeamUser = await this.prisma.teamUser.findFirst({
        where: {
          email: data.email,
          teamId: data.teamId,
        },
      });

      if (existingTeamUser) {
        throw new Error('User is already a member of this team');
      }
    }

    data.status = TeamUserStatusTypes.Invited;

    return this.teamUserGateway.createTeamUser(data, userId);
  }

  async updateTeamUser(teamUserId: string, teamId: string, data: IUpdateTeamUserData): Promise<ITeamUserData> {
    return this.teamUserGateway.updateTeamUser(teamUserId, teamId, data);
  }

  async deleteTeamUser(teamUserId: string, teamId: string): Promise<boolean> {
    return this.teamUserGateway.deleteTeamUser(teamUserId, teamId);
  }
}
