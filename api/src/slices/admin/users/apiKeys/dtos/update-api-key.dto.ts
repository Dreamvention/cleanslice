import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { IUpdateApiKeyData } from '#user/apiKey/domain';

export class UpdateApiKeyDto implements IUpdateApiKeyData {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
