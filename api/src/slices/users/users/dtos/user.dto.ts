import { IUserData } from '../domain';
import { RoleTypes } from '#users/users';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto implements IUserData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

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
