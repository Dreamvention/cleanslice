/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { injectable, inject } from 'tsyringe';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ApiAxios } from '../../../setup/apiAxios';

import { DefaultService } from './services/DefaultService';

@injectable()
export class ApiRepository {
  public readonly default: DefaultService;

  public readonly request: BaseHttpRequest;

  constructor(@inject(ApiAxios) HttpRequest: BaseHttpRequest, @inject('apiConfig') config?: Partial<OpenAPIConfig>) {
    this.request = HttpRequest;

    this.default = new DefaultService(this.request);
  }
}
