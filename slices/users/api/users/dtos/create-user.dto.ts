import { IUserData } from '../domain/entities';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUserData {
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
}
