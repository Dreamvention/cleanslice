/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { injectable, inject } from 'tsyringe';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ApiAxios } from '@/slices/setup/apiAxios';
import { ApiClient } from './ApiClient';

@injectable()
export class ApiRepository extends ApiClient {
  constructor(@inject('apiConfig') config: Partial<OpenAPIConfig>) {
    super(config, ApiAxios);
  }
}
