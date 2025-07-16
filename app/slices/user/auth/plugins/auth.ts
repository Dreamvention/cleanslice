import { authMiddleware } from '../../auth/middleware/auth';
import { teamMiddleware } from '../../team/middleware/team';
import type { Router } from 'vue-router';

export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router as Router;

  // Register auth middleware globally
  nuxtApp.vueApp.use(() => {
    router.beforeEach(authMiddleware);
  });

  // Register team middleware globally
  nuxtApp.vueApp.use(() => {
    router.beforeEach(teamMiddleware);
  });

  console.log('👤 User Plugin - Global middlewares initialized');
});
