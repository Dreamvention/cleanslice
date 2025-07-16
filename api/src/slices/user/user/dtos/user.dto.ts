import { ITeamData } from '#user/team/domain';
import { IUserData, RoleTypes } from '../domain';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto implements IUserData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  teams: ITeamData[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  emailConfirmed: boolean;
  @ApiProperty()
  emailError?: boolean;

  @ApiProperty()
  emailErrorDescription?: string;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  banned: boolean;

  @ApiProperty({ enum: RoleTypes, enumName: 'Role', isArray: true })
  roles: RoleTypes[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
