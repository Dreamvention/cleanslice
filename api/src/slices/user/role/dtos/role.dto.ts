import { IRoleData } from '../domain';
import { ApiProperty } from '@nestjs/swagger';
export class RoleDto implements IRoleData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, isArray: true })
  permissions: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
