import { IsArray, IsString } from 'class-validator';
import { IUpdateRoleData } from '../domain';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateRoleDto implements IUpdateRoleData {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  permissions: string[];
}
