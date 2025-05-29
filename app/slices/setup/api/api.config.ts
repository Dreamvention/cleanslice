// export const apiConfig = {
//   BASE: process.env.API_URL ?? 'http://localhost:3333',
//   VERSION: '1.0',
//   WITH_CREDENTIALS: false,
//   CREDENTIALS: 'same-origin',
//   TOKEN: undefined,
//   USERNAME: undefined,
//   PASSWORD: undefined,
//   HEADERS: undefined,
//   ENCODE_PATH: undefined,
// };

import type { CreateClientConfig } from './data/repositories/api/client.gen';
import { client } from './data/repositories/api/client.gen';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: process.env.API_URL ?? 'http://localhost:3333',
  interceptors: {
    request: [
      (config: AxiosRequestConfig) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
    ],
    response: [
      (response: AxiosResponse) => {
        // Handle successful responses
        return response;
      },
      (error: AxiosError) => {
        // Handle error responses
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          // You might want to redirect to login page here
        }
        return Promise.reject(error);
      },
    ],
  },
});
