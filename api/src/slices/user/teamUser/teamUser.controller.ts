import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamUserService } from './domain';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiListResponse, ApiSingleResponse, IMetaResponse } from '#core';
import { RolePermission } from '../role/rolePermission.decorator';
import { CreateTeamUserDto, TeamUserDto, UpdateTeamUserDto, TeamUserPermissionsDto, FilterTeamUserDto } from './dtos';
import { TeamPermissionGuard } from '../../admin/users/teams/teamRole.guard';
import { TeamUserPermissions } from './domain/teamUser.types';
import { User } from '#user/auth/user.decorator';

@ApiTags('teamUsers')
@Controller('teamUsers')
@UseGuards(TeamPermissionGuard)
export class TeamUserController {
  constructor(private teamUserService: TeamUserService) {}

  @ApiOperation({ description: 'Get a team users', operationId: 'getTeamUsers' })
  @ApiListResponse(TeamUserDto)
  @Get(':id/users')
  @RolePermission(['team-users:read'])
  async getTeamUsers(
    @Query() query: FilterTeamUserDto,
    @Param('id') id: string,
  ): Promise<{ data: TeamUserDto[]; meta: IMetaResponse }> {
    return await this.teamUserService.getTeamUsers(id, query);
  }

  @ApiOperation({ description: 'Get a team user', operationId: 'getTeamUser' })
  @ApiSingleResponse(TeamUserDto)
  @Get(':id/users/:teamUserId')
  @RolePermission(['team-users:read'])
  async getTeamUser(@Param('id') id: string, @Param('teamUserId') teamUserId: string): Promise<TeamUserDto> {
    return await this.teamUserService.getTeamUser(id, teamUserId);
  }

  @ApiOperation({ description: 'Create user to the team', operationId: 'createTeamUser' })
  @ApiBody({ type: CreateTeamUserDto })
  @ApiSingleResponse(TeamUserDto)
  @Post(':id/users')
  @RolePermission(['team-users:write'])
  async createTeamUser(@Param('id') id: string, @Body() data: CreateTeamUserDto): Promise<TeamUserDto> {
    data.teamId = id;
    return await this.teamUserService.createTeamUser(data);
  }

  @ApiOperation({ description: 'Update team user', operationId: 'updateTeamUser' })
  @ApiSingleResponse(TeamUserDto)
  @ApiBody({ type: UpdateTeamUserDto })
  @Put(':id/users/:teamUserId')
  @RolePermission(['team-users:write'])
  async updateTeamUser(
    @Param('id') id: string,
    @Param('teamUserId') teamUserId: string,
    @Body() data: UpdateTeamUserDto,
  ): Promise<TeamUserDto> {
    return await this.teamUserService.updateTeamUser(teamUserId, id, data);
  }

  @ApiOperation({ description: 'Delete user from the team', operationId: 'deleteTeamUser' })
  @ApiSingleResponse(Boolean)
  @Delete(':id/users/:teamUserId')
  @RolePermission(['team-users:write'])
  async deleteTeamUser(@Param('teamUserId') teamUserId: string, @Param('id') id: string) {
    return await this.teamUserService.deleteTeamUser(teamUserId, id);
  }

  @ApiOperation({ description: 'Get available team user permissions', operationId: 'getTeamUserPermissions' })
  @ApiSingleResponse(TeamUserPermissionsDto)
  @Get('permissions')
  @RolePermission(['team-users:read'])
  async getTeamUserPermissions(): Promise<TeamUserPermissionsDto> {
    return {
      permissions: Object.values(TeamUserPermissions),
    };
  }

  @ApiOperation({ description: 'Update user invite', operationId: 'updateTeamUserInvite' })
  @ApiSingleResponse(TeamUserDto)
  @ApiBody({ type: UpdateTeamUserDto })
  @Put(':id/invites')
  async updateTeamUserInvite(
    @Param('id') id: string,
    @User() user: any,
    @Body() data: UpdateTeamUserDto,
  ): Promise<TeamUserDto> {
    return await this.teamUserService.updateTeamUser(user.email, id, data);
  }
}
