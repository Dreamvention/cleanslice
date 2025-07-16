import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { IRoleData, RoleService } from './domain';
import { CreateRoleDto, UpdateRoleDto, RoleDto } from './dtos';
import { ApiSingleResponse, ApiPaginatedResponse } from '#core';
import { AdminGuard, AdminRole } from '#user/admin';

@ApiTags('roles')
@Controller('roles')
// @UseGuards(AdminGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ description: 'List all roles', operationId: 'getRoles' })
  @ApiPaginatedResponse(RoleDto)
  @Get()
  async getRoles(): Promise<IRoleData[]> {
    return await this.roleService.getRoles();
  }

  @ApiOperation({ description: 'Get a role', operationId: 'getRole' })
  @ApiSingleResponse(RoleDto)
  @Get(':id')
  async getRole(@Param('id') id: string): Promise<IRoleData> {
    return await this.roleService.getRole(id);
  }

  @ApiOperation({ description: 'Create a new role', operationId: 'createRole' })
  @ApiBody({ type: CreateRoleDto })
  @ApiSingleResponse(RoleDto)
  @Post()
  @AdminRole(['admin'])
  async createRole(@Body() data: CreateRoleDto): Promise<IRoleData> {
    return await this.roleService.createRole(data);
  }

  @ApiOperation({ description: 'Update a role', operationId: 'updateRole' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiSingleResponse(RoleDto)
  @Put(':id')
  @AdminRole(['admin'])
  async updateRole(@Param('id') id: string, @Body() data: UpdateRoleDto): Promise<IRoleData> {
    return await this.roleService.updateRole(id, data);
  }

  @ApiOperation({ description: 'Delete a role', operationId: 'deleteRole' })
  @Delete(':id')
  @AdminRole(['admin'])
  async deleteRole(@Param('id') id: string): Promise<boolean> {
    return await this.roleService.deleteRole(id);
  }
}
