import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UploadFileDto {
  teamId: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsString()
  file: any;
}
