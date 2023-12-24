import { IsString, IsNotEmpty } from 'class-validator';
import { IUserData } from '../../users/domain';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto implements IUserData {
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
