import { IApiKeyData, ICreateApiKeyData, IUpdateApiKeyData } from './apiKey.types';

export abstract class IApiKeysGateway {
  abstract getApiKeys(filter?: IFilterApiKey): Promise<IApiKeyData[]>;
  abstract getApiKey(id: string): Promise<IApiKeyData>;
  abstract createApiKey(data: ICreateApiKeyData): Promise<IApiKeyData>;
  abstract updateApiKey(id: string, data: IUpdateApiKeyData): Promise<IApiKeyData>;
  abstract deleteApiKey(id: string): Promise<boolean>;
  abstract useApiKey(key: string, domain: string): Promise<IApiKeyData>;
}

export interface IFilterApiKey {
  teamId: string;
  name?: string;
}
