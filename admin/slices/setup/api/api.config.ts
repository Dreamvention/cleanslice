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
import type { AxiosRequestConfig } from 'axios';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: process.env.API_URL ?? 'http://localhost:3333',
});

const handleError = (error: any) => {
  // Handle different types of errors
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response Error:', {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request Error:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  return Promise.reject(error);
};
