import { Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { ApiKeysService } from './domain';
import { CreateApiKeyDto, UpdateApiKeyDto, ApiKeyDto, FilterApiKeyDto } from './dtos';
import { ApiListResponse, ApiSingleResponse, ApiSuccessResponse } from '#core';
import { plainToClass } from 'class-transformer';
import { TeamsController, Team } from '#users/teams';

@TeamsController('apiKeys')
export class ApiKeysController {
  constructor(private apiKeysService: ApiKeysService) {}

  @ApiOperation({ description: 'Get all apiKeys', operationId: 'getApiKeys' })
  @ApiListResponse(ApiKeyDto)
  @Get()
  async getApiKeys(@Team() team: any, @Query() query?: FilterApiKeyDto) {
    query.teamId = team.id;

    const apiKeys = await this.apiKeysService.getApiKeys(query);
    return apiKeys.map((apiKey) => plainToClass(ApiKeyDto, apiKey));
  }

  @ApiOperation({ description: 'Get an apiKey', operationId: 'getApiKey' })
  @ApiSingleResponse(ApiKeyDto)
  @Get(':id')
  async getApiKey(@Param('id') id: string) {
    const apiKey = await this.apiKeysService.getApiKey(id);
    return plainToClass(ApiKeyDto, apiKey);
  }

  @ApiOperation({ description: 'Create an apiKey', operationId: 'createApiKey' })
  @ApiBody({ type: CreateApiKeyDto })
  @ApiSingleResponse(ApiKeyDto)
  @Post()
  async createApiKey(@Team() team: any, @Body() data: CreateApiKeyDto) {
    data.teamId = team.id;

    return await this.apiKeysService.createApiKey(data);
  }

  @ApiOperation({ description: 'Edit an apiKey', operationId: 'updateApiKey' })
  @ApiBody({ type: UpdateApiKeyDto })
  @ApiSingleResponse(ApiKeyDto)
  @Put(':id')
  async updateApiKey(@Param('id') id: string, @Body() data: UpdateApiKeyDto) {
    const apiKey = await this.apiKeysService.updateApiKey(id, data);
    return plainToClass(ApiKeyDto, apiKey);
  }

  @ApiOperation({ description: 'Delete an apiKey', operationId: 'deleteApiKey' })
  @ApiSuccessResponse()
  @Delete(':id')
  async deleteApiKey(@Param('id') id: string) {
    return this.apiKeysService.deleteApiKey(id);
  }
}
