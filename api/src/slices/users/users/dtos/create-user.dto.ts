import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserData } from '../domain';
import { RoleTypes } from '#users/users';

export class CreateUserDto implements ICreateUserData {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ enum: RoleTypes, isArray: true })
  public roles: RoleTypes[];
}
