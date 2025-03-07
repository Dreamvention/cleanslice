import { Injectable } from '@nestjs/common';
import { IApiKeysGateway, IFilterApiKey } from './apiKeys.gateway';
import { IApiKeyData, ICreateApiKeyData, IUpdateApiKeyData } from './apiKey.types';

@Injectable()
export class ApiKeysService {
  constructor(private readonly apiKeysGateway: IApiKeysGateway) {}
  async createApiKey(data: ICreateApiKeyData): Promise<IApiKeyData> {
    const apiKey = await this.apiKeysGateway.createApiKey(data);
    return apiKey;
  }
  async getApiKeys(filter: IFilterApiKey): Promise<IApiKeyData[]> {
    const apiKeys = await this.apiKeysGateway.getApiKeys(filter);
    return apiKeys;
  }
  async getApiKey(id: string): Promise<IApiKeyData> {
    const apiKey = await this.apiKeysGateway.getApiKey(id);
    return apiKey;
  }
  async updateApiKey(id: string, data: IUpdateApiKeyData): Promise<IApiKeyData> {
    const apiKey = await this.apiKeysGateway.updateApiKey(id, data);
    return apiKey;
  }
  async deleteApiKey(id: string): Promise<void> {
    await this.apiKeysGateway.deleteApiKey(id);
  }

  async useApiKey(key: string, domain: string): Promise<IApiKeyData> {
    return await this.apiKeysGateway.useApiKey(key, domain);
  }
}
