import { ITeamData } from '../domain';
import { UserDto } from '#user/user';
import { ApiProperty } from '@nestjs/swagger';
import { OnboardingTeamDto } from './onboardingTeam.dto';

export class TeamDto implements ITeamData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  codename: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: UserDto })
  user?: UserDto;

  @ApiProperty()
  vectorId: string;

  @ApiProperty()
  vectorTable: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
