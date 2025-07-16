import { Get, Post, Put, Delete, Body, Param, Query, Controller } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ITeamData, TeamService } from '../../../user/team/domain';
import { CreateTeamDto, UpdateTeamDto, AdminTeamDto, FilterTeamDto } from './dtos';
import { ApiListResponse, ApiSingleResponse, ApiSuccessResponse, IMetaResponse } from '#core';
import { plainToClass } from 'class-transformer';
import { User } from '../../../user/auth/user.decorator';
import { RolePermission } from '../../../user/role';

@Controller('admin/teams')
@ApiTags('admin/teams')
@ApiBearerAuth()
export class TeamsController {
  constructor(private teamService: TeamService) {}

  @ApiOperation({ description: 'Get all teams', operationId: 'getAdminTeams' })
  @ApiListResponse(AdminTeamDto)
  @Get()
  @RolePermission(['teams:read'])
  async getTeams(@Query() query?: FilterTeamDto): Promise<{ data: ITeamData[]; meta: IMetaResponse }> {
    return await this.teamService.getTeams(query);
  }

  @ApiOperation({ description: 'Get a team', operationId: 'getAdminTeam' })
  @ApiSingleResponse(AdminTeamDto)
  @Get(':id')
  @RolePermission(['teams:read'])
  async getTeam(@Param('id') id: string): Promise<ITeamData> {
    return await this.teamService.getTeam(id);
  }

  @ApiOperation({ description: 'Create a team', operationId: 'createAdminTeam' })
  @ApiBody({ type: CreateTeamDto })
  @ApiSingleResponse(AdminTeamDto)
  @Post()
  @RolePermission(['teams:create'])
  async createTeam(@Body() data: CreateTeamDto, @User() user: any): Promise<ITeamData> {
    data.userId = user.id;
    return await this.teamService.createTeam(data);
  }

  @ApiOperation({ description: 'Edit a team', operationId: 'updateAdminTeam' })
  @ApiBody({ type: UpdateTeamDto })
  @ApiSingleResponse(AdminTeamDto)
  @Put(':id')
  @RolePermission(['teams:update'])
  async updateTeam(@Param('id') id: string, @Body() data: UpdateTeamDto): Promise<ITeamData> {
    return await this.teamService.updateTeam(id, data);
  }

  @ApiOperation({ description: 'Delete a team', operationId: 'deleteAdminTeam' })
  @ApiSuccessResponse()
  @Delete(':id')
  @RolePermission(['teams:delete'])
  async deleteTeam(@Param('id') id: string): Promise<boolean> {
    return this.teamService.deleteTeam(id);
  }
}
