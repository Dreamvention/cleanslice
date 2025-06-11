import { authMiddleware } from '../middleware/auth';

export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth', authMiddleware, { global: true });
});
