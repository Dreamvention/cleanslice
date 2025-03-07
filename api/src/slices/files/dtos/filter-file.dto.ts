import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IFilterFile } from '../domain';

export class FilterFileDto implements IFilterFile {
  teamId: string;
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  readonly type?: string;
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  readonly contentType?: string;
}
