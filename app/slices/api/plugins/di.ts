import 'reflect-metadata';
import { container } from 'tsyringe';
import { apiConfig } from '../../../configs/api.config';

export default defineNuxtPlugin((nuxtApp) => {
  container.register('apiConfig', { useValue: apiConfig });
  nuxtApp.$di = container;
});
