import { Injectable } from '@nestjs/common';
import { IApiKeyGateway, IFilterApiKey } from './apiKey.gateway';
import { IApiKeyData, ICreateApiKeyData, IUpdateApiKeyData } from './apiKey.types';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyGateway: IApiKeyGateway) {}
  async createApiKey(data: ICreateApiKeyData): Promise<IApiKeyData> {
    const apiKey = await this.apiKeyGateway.createApiKey(data);
    return apiKey;
  }
  async getApiKeys(filter: IFilterApiKey): Promise<IApiKeyData[]> {
    const apiKeys = await this.apiKeyGateway.getApiKeys(filter);
    return apiKeys;
  }
  async getApiKey(id: string): Promise<IApiKeyData> {
    const apiKey = await this.apiKeyGateway.getApiKey(id);
    return apiKey;
  }
  async updateApiKey(id: string, data: IUpdateApiKeyData): Promise<IApiKeyData> {
    const apiKey = await this.apiKeyGateway.updateApiKey(id, data);
    return apiKey;
  }
  async deleteApiKey(id: string): Promise<void> {
    await this.apiKeyGateway.deleteApiKey(id);
  }

  async useApiKey(key: string, domain: string): Promise<IApiKeyData> {
    return await this.apiKeyGateway.useApiKey(key, domain);
  }
}
