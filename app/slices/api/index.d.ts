import type { NuxtApp } from '@nuxt/schema';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

declare module '#app' {
  interface NuxtApp {
    $axios: AxiosHttpRequest;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosHttpRequest;
  }
}

export {};
