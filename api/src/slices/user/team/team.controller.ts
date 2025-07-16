import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ITeamData, TeamService } from './domain';
import { CreateTeamDto, UpdateTeamDto, TeamDto, FilterTeamDto } from './dtos';
import { ApiSingleResponse, ApiPaginatedResponse, IMetaResponse } from '#core';
import { User } from '../auth/user.decorator';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @ApiOperation({ description: 'List all teams by User', operationId: 'getTeams' })
  @ApiPaginatedResponse(TeamDto)
  @Get()
  async getTeams(
    @Query() query: FilterTeamDto,
    @User() user: any,
  ): Promise<{ data: ITeamData[]; meta: IMetaResponse }> {
    const userId = user.id;
    return await this.teamService.getTeamsByUserId(userId, query);
  }

  @ApiOperation({ description: 'Get a team', operationId: 'getTeam' })
  @ApiSingleResponse(TeamDto)
  @Get(':id')
  async getTeam(@Param('id') id: string): Promise<ITeamData> {
    return await this.teamService.getTeam(id);
  }

  @ApiOperation({ description: 'Create an team', operationId: 'createTeam' })
  @ApiBody({ type: CreateTeamDto })
  @ApiSingleResponse(TeamDto)
  @Post()
  async createTeam(@Body() data: CreateTeamDto, @User() user: any) {
    data.userId = user.id;
    return await this.teamService.createTeam(data);
  }

  @ApiOperation({ description: 'Update a team', operationId: 'updateTeam' })
  @ApiBody({ type: UpdateTeamDto })
  @ApiSingleResponse(TeamDto)
  @Put(':id')
  async updateTeam(@Param('id') id: string, @Body() data: UpdateTeamDto): Promise<ITeamData> {
    return await this.teamService.updateTeam(id, data);
  }

  @ApiOperation({ description: 'Delete a team', operationId: 'deleteTeam' })
  @Delete(':id')
  async deleteTeam(@Param('id') id: string): Promise<boolean> {
    return await this.teamService.deleteTeam(id);
  }
}
