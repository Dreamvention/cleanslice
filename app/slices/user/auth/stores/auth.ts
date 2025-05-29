import { defineStore } from 'pinia';
import { AuthService, UserDto } from '#api/data';
import { useCookie } from '#app';
import { client } from '#api/data/repositories/api/client.gen';

export type IAuthData = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export const authCookieName = 'AUTH';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {} as null | IAuthData,
    user: null as null | UserDto,
    loading: false,
  }),

  getters: {
    getAuth: (state) => {
      return state.auth;
    },
    isAuthenticated: (state) => {
      return !!state.auth?.accessToken;
    },
    isLoading: (state) => state.loading,
  },
  actions: {
    async init() {
      console.log('auth init start...');
      this.loading = true;
      const authCookie = useCookie<IAuthData | null>(authCookieName, {
        default: () => null,
      });
      this.auth = authCookie.value;
      if (this.isAuthenticated) {
        handleApiAuthentication(this.auth.accessToken);
        const response = await AuthService.me();
        if (response.data?.data) {
          this.user = response.data.data;
        } else {
          this.logout();
        }
      }
      this.loading = false;
      console.log('auth init finished...');
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
            const authCookie = useCookie(authCookieName);
            authCookie.value = JSON.stringify(this.auth);
            // Cookies.set(authCookieName, JSON.stringify(th
            // Cookies.set(authCookieName, JSON.stringify(this.auth), {
            //   expires: 30,
            //   secure: process.env.NODE_ENV !== 'development',
            //   domain: process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
            // }); // secure: true for HTTPS
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
      console.log('email response', email);
      try {
        this.loading = true;
        const response = await AuthService.login({ body: { email, password, deviceId: 'app' } });

        console.log('refreshToken response', response);
        if (response.data?.data?.accessToken) {
          this.auth = response.data.data;
          const authCookie = useCookie(authCookieName);
          authCookie.value = JSON.stringify(this.auth);
          // Cookies.set(authCookieName, JSON.stringify(this.auth), {
          //   expires: 30,
          //   secure: process.env.NODE_ENV !== 'development',
          //   domain: process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
          // }); // secure: true for HTTPS
          handleApiAuthentication(this.auth.accessToken);
        }
        return response;
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
