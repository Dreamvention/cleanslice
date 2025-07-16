import { ApiProperty } from '@nestjs/swagger';
import { IApiKeyData } from '../domain';
import { Transform } from 'class-transformer';

export class ApiKeyDto implements IApiKeyData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  teamId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Transform(({ value }) => maskSecret(value))
  secret: string;

  @ApiProperty()
  lastUsedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

function maskSecret(key: string): string {
  return `${key.slice(0, 7)}****${key.slice(-4)}`;
}
