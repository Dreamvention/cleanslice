import { defineStore } from 'pinia';
import { AuthService, UserDto } from '#api/data';
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
        const { data } = await AuthService.me();

        if (data?.data) {
          this.user = data.data;
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
          const response = await AuthService.refresh({
            body: {
              token: this.auth.refreshToken,
            },
          });

          if (response.data?.accessToken) {
            this.auth.accessToken = response.data.accessToken;
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
        const response = await AuthService.login({ body: { email, password, deviceId: 'app' } });
        if (response.data?.accessToken) {
          this.auth = response.data;
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
        await AuthService.register({
          body: { name, email, password, deviceId: 'app' },
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
      await AuthService.resendConfirm({
        body: { name: email },
      });
    },
  },
});
