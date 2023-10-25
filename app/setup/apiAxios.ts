import { injectable, inject } from 'tsyringe';
import axios from 'axios';
// import axiosRetry from 'axios-retry';
import { request as __request } from '../data/repositories/api/core/request';
import { CancelablePromise, BaseHttpRequest } from '../data/repositories/api';
import type { OpenAPIConfig } from '../data/repositories/api';
import { ApiRequestOptions } from '../data/repositories/api/core/ApiRequestOptions';

@injectable()
export class ApiAxios extends BaseHttpRequest {
  axiosInstance = axios.create();

  constructor(@inject('apiConfig') config: OpenAPIConfig) {
    super(config);
    // axiosRetry(this.axiosInstance);
  }

  public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    return __request(this.config, options, this.axiosInstance);
  }
}
