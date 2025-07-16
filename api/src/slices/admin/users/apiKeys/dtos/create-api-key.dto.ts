import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { ICreateApiKeyData } from '#user/apiKey/domain';

export class CreateApiKeyDto implements ICreateApiKeyData {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
