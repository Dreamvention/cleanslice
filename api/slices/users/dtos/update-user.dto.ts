import { IUserData } from '../domain/entities';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements IUserData {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public password: string;
}
