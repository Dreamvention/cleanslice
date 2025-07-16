import type { NuxtApp } from '@nuxt/schema';
import type { DependencyContainer } from 'tsyringe';

declare module '#app' {
  interface NuxtApp {
    $di: DependencyContainer;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $di: DependencyContainer;
  }
}

export {};
