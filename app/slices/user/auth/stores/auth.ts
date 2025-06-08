import { defineStore } from 'pinia';
import { AuthService, AuthDto } from '#api/data';
import { useCookie } from '#app';

export const authCookieName = process.env.AUTH_COOKIE_NAME || 'AUTH';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: null as null | AuthDto,
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
    authenticate(auth: AuthDto) {
      this.auth = auth;
      const authCookie = useCookie(authCookieName);
      authCookie.value = JSON.stringify(auth);
      handleApiAuthentication(auth.accessToken);
    },

    async init() {
      console.log('auth init start...');
      this.loading = true;
      const authCookie = useCookie<AuthDto | null>(authCookieName, {
        default: () => null,
      });
      this.auth = authCookie.value;
      if (this.isAuthenticated) {
        handleApiAuthentication(this.auth?.accessToken);
      }
      this.loading = false;
      console.log('auth init finished...');
    },

    async refreshToken() {
      try {
        this.loading = true;
        if (this.auth && !!this.auth.refreshToken) {
          const response = await AuthService.refreshToken({
            body: {
              refreshToken: this.auth.refreshToken,
            },
          });
          if (response.data?.data) {
            this.authenticate(response.data.data);
          } else {
            this.logout();
          }
        }
        this.loading = false;
      } catch (error) {
        this.logout();
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      try {
        this.loading = true;
        const response = await AuthService.login({ body: { email, password, deviceId: 'app' } });

        if (response.data?.data?.accessToken) {
          this.authenticate(response.data.data);
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
        await AuthService.register({
          body: { name, email, password, deviceId: 'app' },
        });
      } catch (e) {
        console.log(e);
      }
    },

    async logout() {
      handleAccountLogout();
      this.auth = null;
    },

    async resendConfirm(email: string) {
      await AuthService.resendConfirmation({
        body: { email: email },
      });
    },
  },
});
