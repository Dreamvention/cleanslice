import { Get, Post, Put, Delete, Body, Param, Query, Controller } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiKeyService } from '../../../user/apiKey/domain';
import { CreateApiKeyDto, UpdateApiKeyDto, ApiKeyDto, FilterApiKeyDto } from './dtos';
import { ApiListResponse, ApiSingleResponse, ApiSuccessResponse } from '#core';
import { plainToClass } from 'class-transformer';
import { Team } from '../../../user/team/team.decorator';

@Controller('apiKeys')
@ApiTags('apiKeys')
@ApiBearerAuth()
export class ApiKeysController {
  constructor(private apiKeyService: ApiKeyService) {}

  @ApiOperation({ description: 'Get all apiKeys', operationId: 'getAdminApiKeys' })
  @ApiListResponse(ApiKeyDto)
  @Get()
  async getApiKeys(@Query() query?: FilterApiKeyDto) {
    const apiKeys = await this.apiKeyService.getApiKeys(query);
    return apiKeys.map((apiKey) => plainToClass(ApiKeyDto, apiKey));
  }

  @ApiOperation({ description: 'Get an apiKey', operationId: 'getAdminApiKey' })
  @ApiSingleResponse(ApiKeyDto)
  @Get(':id')
  async getApiKey(@Param('id') id: string) {
    const apiKey = await this.apiKeyService.getApiKey(id);
    return plainToClass(ApiKeyDto, apiKey);
  }

  @ApiOperation({ description: 'Create an apiKey', operationId: 'createAdminApiKey' })
  @ApiBody({ type: CreateApiKeyDto })
  @ApiSingleResponse(ApiKeyDto)
  @Post()
  async createApiKey(@Body() data: CreateApiKeyDto) {
    return await this.apiKeyService.createApiKey(data);
  }

  @ApiOperation({ description: 'Edit an apiKey', operationId: 'updateAdminApiKey' })
  @ApiBody({ type: UpdateApiKeyDto })
  @ApiSingleResponse(ApiKeyDto)
  @Put(':id')
  async updateApiKey(@Param('id') id: string, @Body() data: UpdateApiKeyDto) {
    const apiKey = await this.apiKeyService.updateApiKey(id, data);
    return plainToClass(ApiKeyDto, apiKey);
  }

  @ApiOperation({ description: 'Delete an apiKey', operationId: 'deleteAdminApiKey' })
  @ApiSuccessResponse()
  @Delete(':id')
  async deleteApiKey(@Param('id') id: string) {
    return this.apiKeyService.deleteApiKey(id);
  }
}
