import { IsString } from 'class-validator';
import { IUpdateApiKeyData } from '../domain';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateApiKeyDto implements IUpdateApiKeyData {
  @ApiProperty()
  @IsString()
  name: string;
}
