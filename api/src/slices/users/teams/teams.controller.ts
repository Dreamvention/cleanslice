import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ITeamData, TeamsService } from './domain';
import { CreateTeamDto, UpdateTeamDto, TeamDto, TeamsFilterDto } from './dtos';
import { ApiSingleResponse, ApiPaginatedResponse, IMetaResponse } from '#core';
import { User } from '#users/auth/user.decorator';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @ApiOperation({ description: 'List all teams by User', operationId: 'getTeams' })
  @ApiPaginatedResponse(TeamDto)
  @Get()
  async getTeams(
    @Query() query: TeamsFilterDto,
    @User() user: any,
  ): Promise<{ data: ITeamData[]; meta: IMetaResponse }> {
    const userId = user.id;
    return await this.teamsService.getTeamsByUserId(userId, query);
  }

  @ApiOperation({ description: 'Get a team', operationId: 'getTeam' })
  @ApiSingleResponse(TeamDto)
  @Get(':id')
  async getTeam(@Param('id') id: string): Promise<ITeamData> {
    return await this.teamsService.getTeam(id);
  }

  @ApiOperation({ description: 'Create an team', operationId: 'createTeam' })
  @ApiBody({ type: CreateTeamDto })
  @ApiSingleResponse(TeamDto)
  @Post()
  async createTeam(@Body() data: CreateTeamDto, @User() user: any) {
    data.userId = user.id;
    return await this.teamsService.createTeam(data);
  }

  @ApiOperation({ description: 'Update a team', operationId: 'updateTeam' })
  @ApiBody({ type: UpdateTeamDto })
  @ApiSingleResponse(TeamDto)
  @Put(':id')
  async updateTeam(@Param('id') id: string, @Body() data: UpdateTeamDto): Promise<ITeamData> {
    return await this.teamsService.updateTeam(id, data);
  }

  @ApiOperation({ description: 'Delete a team', operationId: 'deleteTeam' })
  @Delete(':id')
  async deleteTeam(@Param('id') id: string): Promise<boolean> {
    return await this.teamsService.deleteTeam(id);
  }
}
