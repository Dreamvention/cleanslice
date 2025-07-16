import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateTeamUserData, TeamUserStatusTypes } from '../domain';

export class CreateTeamUserDto implements ICreateTeamUserData {
  teamId: string;

  status: TeamUserStatusTypes;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  roleId: string;
}
