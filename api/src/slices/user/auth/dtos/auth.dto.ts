import { ApiProperty } from '@nestjs/swagger';
import { IAuthData } from '../domain';
export class AuthDto implements IAuthData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
