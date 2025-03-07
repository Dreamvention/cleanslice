import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateApiKeyData } from '../domain';
export class CreateApiKeyDto implements ICreateApiKeyData {
  teamId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
