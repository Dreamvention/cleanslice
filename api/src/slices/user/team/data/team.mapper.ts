import { Injectable } from '@nestjs/common';
import DB, { Prisma } from '@prisma/client';
import { ITeamData, ICreateTeamData, IUpdateTeamData } from '../domain';
import { v4 as uuid } from 'uuid';

export type ITeamResponse = DB.Team;
export type ITeamCreateRequest = Prisma.XOR<Prisma.TeamCreateInput, Prisma.TeamUncheckedCreateInput>;
export type ITeamUpdateRequest = Prisma.XOR<Prisma.TeamUpdateInput, Prisma.TeamUncheckedUpdateInput>;

@Injectable()
export class TeamMapper {
  // constructor(private readonly userMapper: UserMapper) {}
  constructor() {}

  toData(data: ITeamResponse): ITeamData {
    return {
      id: data.id,
      codename: data.codename,
      name: data.name,
      userId: data.userId,
      // user: data.userId ? this.userMapper.toData(data.user) : undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  toCreate(data: ICreateTeamData): ITeamCreateRequest {
    const id = `team-${uuid()}`;

    if (data.codename)
      return {
        id,
        user: { connect: { id: data.userId } },
        name: data.name,
        codename: data.codename,
      };
  }

  toUpdate(data: IUpdateTeamData): ITeamUpdateRequest {
    return {
      name: data.name,
      codename: data.codename,
    };
  }

  sanitizeString(input) {
    // Convert to lowercase
    const lowercased = input.toLowerCase();

    // Remove all characters except Latin letters, numbers, spaces, and hyphens
    const sanitized = lowercased.replace(/[^a-z0-9\-]/g, '');

    return sanitized;
  }

  validateCodename(codename) {
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

    return { valid: true };
  }
}
