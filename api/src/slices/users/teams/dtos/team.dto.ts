import { ITeamData } from '../domain';
import { UserDto } from '#users/users';
import { ApiProperty } from '@nestjs/swagger';

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
