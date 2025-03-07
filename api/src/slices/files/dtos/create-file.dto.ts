import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateFileDto {
  teamId: string;
  @ApiProperty()
  @IsString()
  contentType: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  path: string;
}
