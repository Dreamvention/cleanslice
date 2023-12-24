import { IUserData } from '../domain/entities';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto implements IUserData {
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public password?: string;
}
