import { injectable, inject } from 'tsyringe';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { request as __request } from '@/data/repositories/api/core/request';
import { CancelablePromise, BaseHttpRequest } from '@/data/repositories/api';
import type { OpenAPIConfig } from '@/data/repositories/api';
import type { ApiRequestOptions } from '@/data/repositories/api/core/ApiRequestOptions';

@injectable()
export class ApiAxios extends BaseHttpRequest {
  axiosInstance = axios.create();

  constructor(config: OpenAPIConfig) {
    super(config);
    axiosRetry(this.axiosInstance);

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        handleError(error);
        return Promise.reject(error);
      },
    );
  }

  public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    return __request(this.config, options, this.axiosInstance);
  }
}
