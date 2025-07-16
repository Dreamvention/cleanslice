import { ApiProperty } from '@nestjs/swagger';
import { ITeamData } from '#user/team/domain';
import { UserDto } from '#user/user/dtos';
import { OnboardingTeamDto } from '#user/team/dtos';

export class AdminTeamDto implements ITeamData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  codename: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  vectorId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: UserDto })
  user?: UserDto;

  @ApiProperty()
  onborded: boolean;

  @ApiProperty()
  onboardingProgress?: OnboardingTeamDto;

  @ApiProperty()
  roadmapProgress: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
