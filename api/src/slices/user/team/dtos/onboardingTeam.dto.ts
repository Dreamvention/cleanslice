import { ApiProperty } from '@nestjs/swagger';
import { ITeamData } from '../domain';

export class OnboardingTeamDto implements ITeamData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  codename: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
