import { defineStore } from 'pinia';
import { AuthDto, LoginUserDto, RegisterUserDto, AuthService } from '#api/data';
import { useCookie } from '#app';
import { useErrorStore } from '@/slices/setup/error/stores/error';

// Constants
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: null as null | AuthDto,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => Boolean(state.auth?.accessToken),
    getToken: (state): string | null => state.auth?.accessToken || null,
    getRefreshToken: (state): string | null => state.auth?.refreshToken || null,
    getStatus(state): 'authenticated' | 'unauthenticated' | 'loading' {
      if (state.loading) return 'loading';
      if (this.isAuthenticated) return 'authenticated';
      return 'unauthenticated';
    },
  },

  actions: {
    // Initialization
    init(): void {
      this.loadFromCookie();
    },

    // State management
    setAuth(auth: AuthDto) {
      this.auth = auth;
      this.saveToCookie();
      handleApiAuthentication(auth.accessToken);
    },

    // Cookie management
    saveToCookie(): void {
      try {
        if (!this.auth) return;
        const data: AuthDto = this.auth;
        const cookie = useCookie(AUTH_COOKIE_NAME, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          secure: true,
          sameSite: 'strict',
        });
        cookie.value = JSON.stringify(data);
      } catch (error) {
        const errorStore = useErrorStore();
        errorStore.setAuthError('auth_cookie_save', 'Failed to save authentication data', { error });
      }
    },

    loadFromCookie(): void {
      try {
        const cookie = useCookie<AuthDto>(AUTH_COOKIE_NAME);
        if (!cookie.value) return;

        this.setAuth(cookie.value);
      } catch (error) {
        const errorStore = useErrorStore();
        errorStore.setAuthError('auth_cookie_load', 'Failed to load authentication data', { error });
        this.clearCookie();
      }
    },

    clearCookie(): void {
      try {
        const cookie = useCookie(AUTH_COOKIE_NAME);
        cookie.value = null;
      } catch (error) {
        const errorStore = useErrorStore();
        errorStore.setAuthError('auth_cookie_clear', 'Failed to clear authentication data', { error });
      }
    },

    // Authentication methods
    async login(credentials: LoginUserDto): Promise<boolean> {
      const errorStore = useErrorStore();
      try {
        const response = await AuthService.login({
          body: { ...credentials },
        });
        const authData = response.data?.data;
        if (!authData) {
          errorStore.setAuthError('auth_login', 'Invalid login response');
          return false;
        }

        this.setAuth(authData);
        navigateTo(pages.goToAfterLogin);
        return true;
      } catch (e) {
        errorStore.setApiError('auth_login', e, 'Failed to login');
        return false;
      }
    },

    async register(credentials: RegisterUserDto): Promise<boolean> {
      const errorStore = useErrorStore();
      try {
        await AuthService.register({
          body: { ...credentials, deviceId: 'app' },
        });

        navigateTo(pages.goToAfterRegister);
        return true;
      } catch (e) {
        errorStore.setApiError('auth_register', e, 'Failed to register');
        return false;
      }
    },

    logout(): void {
      this.auth = null;
      this.clearCookie();
      handleApiAuthentication();
    },

    async refreshToken(): Promise<boolean> {
      const errorStore = useErrorStore();
      if (!this.auth?.refreshToken) {
        errorStore.setAuthError('auth_refresh', 'No refresh token available');
        return false;
      }

      try {
        const response = await AuthService.refreshToken({
          body: { refreshToken: this.auth?.refreshToken },
        });
        const authData = response.data?.data;
        if (!authData) {
          errorStore.setAuthError('auth_refresh', 'Invalid refresh response');
          return false;
        }

        this.setAuth(authData);
        return true;
      } catch (e) {
        errorStore.setApiError('auth_refresh', e, 'Failed to refresh token');
        this.logout();
        return false;
      }
    },

    async resendConfirmation(email: string): Promise<boolean> {
      const errorStore = useErrorStore();
      try {
        await AuthService.resendConfirmation({
          body: { email },
        });
        return true;
      } catch (e) {
        errorStore.setApiError('auth_resend_confirmation', e, 'Failed to resend confirmation email');
        return false;
      }
    },

    // Token management
    async ensureValidToken(): Promise<boolean> {
      const errorStore = useErrorStore();
      if (!this.auth?.accessToken) return false;

      try {
        const payload = JSON.parse(atob(this.auth?.accessToken?.split('.')[1] || ''));
        const isExpired = Date.now() >= payload.exp * 1000;

        if (isExpired) {
          return await this.refreshToken();
        }

        return true;
      } catch {
        errorStore.setAuthError('auth_token', 'Invalid token');
        return false;
      }
    },
  },
});
