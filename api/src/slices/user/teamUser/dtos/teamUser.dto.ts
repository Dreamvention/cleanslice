import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ITeamUserData, TeamUserStatusTypes } from '../domain';

export class TeamUserDto implements ITeamUserData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  teamId: string;

  @ApiProperty()
  roleId: string;

  @ApiProperty({ enum: TeamUserStatusTypes })
  status: TeamUserStatusTypes;

  @ApiProperty()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  updatedAt: Date;
}
