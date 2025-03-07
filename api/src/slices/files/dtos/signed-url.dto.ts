import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class SignedUrlDto {
  @ApiProperty()
  @IsString()
  public url: string;

  @ApiProperty()
  @IsString()
  public path: string;
}
