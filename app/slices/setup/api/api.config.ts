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
import type { AxiosRequestConfig } from 'axios';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: process.env.API_URL ?? 'http://localhost:3333',
});
