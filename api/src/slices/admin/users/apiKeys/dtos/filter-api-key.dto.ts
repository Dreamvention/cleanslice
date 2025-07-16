import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { IFilterApiKey } from '#user/apiKey/domain';

export class FilterApiKeyDto implements IFilterApiKey {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
