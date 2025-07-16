import { client } from '../data/repositories/api/client.gen';
import { defineNuxtPlugin } from '#app';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  // Request interceptor
  client.instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return handleError(error);
    },
  );

  // Response interceptor
  client.instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // You can modify the response here
      return response;
    },
    (error: AxiosError) => {
      return handleError(error);
    },
  );

  return {
    provide: {
      client,
    },
  };
});
