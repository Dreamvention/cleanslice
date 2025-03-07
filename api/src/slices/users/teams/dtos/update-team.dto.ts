import { IUpdateTeamData } from '../domain';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto implements IUpdateTeamData {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  codename: string;
}
