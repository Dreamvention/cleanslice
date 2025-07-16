import { ICreateTeamData } from '../domain';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto implements ICreateTeamData {
  vectorId: string;
  userId: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  codename: string;
}
