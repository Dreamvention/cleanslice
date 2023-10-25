import 'reflect-metadata';
import { container } from 'tsyringe';
import { apiConfig } from '../setup';

export default defineNuxtPlugin((nuxtApp) => {
  container.register('apiConfig', { useValue: apiConfig });

  nuxtApp.$di = container;
});
