import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { ICreateTeamData } from '#user/team/domain';

export class CreateTeamDto implements ICreateTeamData {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  codename: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
