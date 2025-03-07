import { ApiProperty } from '@nestjs/swagger';

export class BaseErrorDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'USER_ALREADY_EXISTS' })
  code: string;

  @ApiProperty({ example: 'A user with this email already exists.' })
  message: string;

  @ApiProperty({ example: '2024-08-29T12:34:56.789Z' })
  timestamp: string;

  @ApiProperty({ example: '/users/register' })
  path: string;
}
