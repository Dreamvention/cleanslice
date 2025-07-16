import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IFilterApiKey } from '../domain';
export class FilterApiKeyDto implements IFilterApiKey {
  teamId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
