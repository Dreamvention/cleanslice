import { defineStore } from 'pinia';
import { ApiRepository, UserDto } from '#api/data';
import Cookies from 'js-cookie';

export type IAuthData = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export const authCookieName = 'AUTH';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {} as IAuthData,
    user: {} as UserDto,
    loading: false,
  }),
  getters: {
    getAuth: (state) => {
      return state.auth;
    },
    isAuthenticated: (state) => {
      return !!state.auth.accessToken;
    },
    isLoading: (state) => state.loading,
  },
  actions: {
    async init() {
      this.loading = true;
      this.auth = JSON.parse(Cookies.get(authCookieName) || '{}');

      if (this.auth) {
        const app = useNuxtApp();
        const { data } = await app.$di.resolve(ApiRepository).auth.me();

        if (data) {
          this.user = data;
        } else {
          this.auth = {} as IAuthData;
        }
      }
      this.loading = false;
    },

    async refreshToken() {
      try {
        this.loading = true;
        const app = useNuxtApp();
        if (this.auth && !!this.auth.refreshToken) {
          const response = await app.$di.resolve(ApiRepository).auth.refresh({
            requestBody: {
              token: this.auth.refreshToken,
            },
          });

          if (response.accessToken) {
            this.auth.accessToken = response.accessToken;
            Cookies.set(authCookieName, JSON.stringify(this.auth), {
              expires: 30,
              secure: process.env.NODE_ENV !== 'development',
              domain: process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
            }); // secure: true for HTTPS
            handleApiAuthentication(this.auth.accessToken);
          } else {
            this.auth = {} as IAuthData;
          }
        }
        this.loading = false;
      } catch (error) {
        this.auth = {} as IAuthData;
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      try {
        this.loading = true;
        const app = useNuxtApp();
        this.auth = await app.$di
          .resolve(ApiRepository)
          .auth.login({ requestBody: { email, password, deviceId: 'app' } });
        if (this.auth.accessToken) {
          Cookies.set(authCookieName, JSON.stringify(this.auth), {
            expires: 30,
            secure: process.env.NODE_ENV !== 'development',
            domain: process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
          }); // secure: true for HTTPS
          handleApiAuthentication(this.auth.accessToken);
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },

    async register(name: string, email: string, password: string) {
      try {
        const app = useNuxtApp();
        await app.$di.resolve(ApiRepository).auth.register({
          requestBody: { name, email, password, deviceId: 'app' },
        });
      } catch (e) {
        console.log(e);
      }
    },

    async logout() {
      handleAccountLogout();
      this.auth = {} as IAuthData;
    },

    async resendConfirm(email: string) {
      const app = useNuxtApp();
      await app.$di.resolve(ApiRepository).auth.resendConfirm({
        requestBody: { name: email },
      });
    },
  },
});
