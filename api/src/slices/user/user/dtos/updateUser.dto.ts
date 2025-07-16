import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateUserData, RoleTypes } from '../domain';

export class UpdateUserDto implements IUpdateUserData {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public email: string;

  @ApiProperty({ enum: RoleTypes, enumName: 'Role', isArray: true })
  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  public roles: RoleTypes[];
}
