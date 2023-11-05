import 'reflect-metadata';
import { container } from 'tsyringe';
import { apiConfig } from '../apiConfig';

export default defineNuxtPlugin((nuxtApp) => {
  container.register('apiConfig', { useValue: apiConfig });
  nuxtApp.$di = container;
});
