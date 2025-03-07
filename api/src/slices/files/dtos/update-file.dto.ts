import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateFileDto {
  @ApiProperty()
  @IsString()
  public name: string;
}
