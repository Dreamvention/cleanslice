import { defineStore } from 'pinia';
import { ApiRepository } from '@/data/repositories';
import Cookies from 'js-cookie';
import { pages } from '@/pages';
export type IAuthData = {
  id: number;
  accessToken: string;
  refreshToken: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {} as IAuthData,
    ignorePages: Object.values([pages.logout]),
    unauthorizedPages: Object.values([pages.login, pages.register]),
  }),
  getters: {
    getAuth: (state) => {
      return state.auth;
    },
    isAuthenticated: (state) => {
      return !!state.auth.accessToken;
    },
    isPageIgnored: (state) => (page: string) => {
      return state.ignorePages.includes(page);
    },
    isPageForUnauthorized: (state) => (page: string) => {
      return state.unauthorizedPages.includes(page);
    },
  },
  actions: {
    async init() {
      this.auth = JSON.parse(Cookies.get('auth') || '{}');
    },

    async login(email: string, password: string) {
      const app = useNuxtApp();
      this.auth = await app.$di.resolve(ApiRepository).auth.login({ email, password, deviceId: 'app' });
      Cookies.set('auth', JSON.stringify(this.auth), { expires: 30, secure: true }); // secure: true for HTTPS
      handleApiAuthentication(this.auth.accessToken);
    },

    async logout() {
      await Cookies.remove('auth');
      handleApiAuthentication();
      this.auth = {} as IAuthData;
    },

    ignorePage(page: string) {
      this.ignorePages.push(page);
    },
  },
});
