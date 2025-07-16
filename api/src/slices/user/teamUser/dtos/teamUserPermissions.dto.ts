import { ApiProperty } from '@nestjs/swagger';
import { TeamUserPermissions } from '../domain/teamUser.types';

export class TeamUserPermissionsDto {
  @ApiProperty({ enum: TeamUserPermissions, isArray: true })
  permissions: TeamUserPermissions[];
}
