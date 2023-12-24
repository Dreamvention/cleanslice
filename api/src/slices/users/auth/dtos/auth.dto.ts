import { IAuthData } from '../domain';
import { ApiProperty } from '@nestjs/swagger';
export class AuthDto implements IAuthData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
