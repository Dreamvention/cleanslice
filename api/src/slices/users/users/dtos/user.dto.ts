import { IUserData } from '../domain/entities';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto implements IUserData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
