import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateAuthData } from '../domain';
import { RoleTypes, ICreateUserData } from '#users/users';

export class RegisterUserDto implements ICreateAuthData, ICreateUserData {
  public roles: RoleTypes[];
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

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
