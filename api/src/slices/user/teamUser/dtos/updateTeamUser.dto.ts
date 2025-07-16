import { ApiProperty } from '@nestjs/swagger';
import { IUpdateTeamUserData, TeamUserStatusTypes } from '../domain';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTeamUserDto implements IUpdateTeamUserData {
  @ApiProperty({ enum: TeamUserStatusTypes })
  @IsEnum(TeamUserStatusTypes)
  @IsOptional()
  status: TeamUserStatusTypes;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  roleId: string;
}
