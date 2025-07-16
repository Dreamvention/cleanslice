import { IsArray, IsString } from 'class-validator';
import { ICreateRoleData } from '../domain';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto implements ICreateRoleData {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  permissions: string[];
}
