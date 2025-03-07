import { IsString, IsNotEmpty } from 'class-validator';
import { RoleTypes } from '#users/users';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateAuthData } from '../domain';

export class LoginUserDto implements ICreateAuthData {
  public roles: RoleTypes[];
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public deviceId: string;
}
