import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AdminRoles } from '#user/admin/domain/admin.types';

@ApiBearerAuth()
@ApiTags('admin-systemRoles')
@Controller('admin/systemRoles')
export class SystemRolesController {
  @Get()
  @ApiOperation({ description: 'List all system roles', operationId: 'getAdminSystemRoles' })
  @ApiResponse({ status: 200, description: 'System roles', type: [String] })
  getRoles(): AdminRoles[] {
    return Object.values(AdminRoles);
  }
}
