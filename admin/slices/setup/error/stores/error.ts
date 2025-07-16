import { defineStore } from 'pinia';

// Types
export interface ErrorInfo {
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

export interface ErrorOptions {
  metadata?: Record<string, unknown>;
  isGlobal?: boolean;
}

interface ErrorState {
  errors: Record<string, ErrorInfo>;
  globalError: ErrorInfo | null;
}

export const useErrorStore = defineStore('error', {
  state: (): ErrorState => ({
    errors: {},
    globalError: null,
  }),

  getters: {
    getError:
      (state) =>
      (key: string): ErrorInfo | null => {
        return state.errors[key] || null;
      },

    hasError:
      (state) =>
      (key: string): boolean => {
        return key in state.errors;
      },

    getGlobalError: (state): ErrorInfo | null => {
      return state.globalError;
    },

    hasGlobalError: (state): boolean => {
      return state.globalError !== null;
    },
  },

  actions: {
    setError(key: string, message: string, options: ErrorOptions = {}): void {
      const error: ErrorInfo = {
        message,
        metadata: options.metadata,
        timestamp: Date.now(),
      };

      if (options.isGlobal) {
        this.globalError = error;
      } else {
        this.errors[key] = error;
      }
    },

    clearError(key: string): void {
      delete this.errors[key];
    },

    clearGlobalError(): void {
      this.globalError = null;
    },

    clearAllErrors(): void {
      this.errors = {};
      this.globalError = null;
    },

    setApiError(key: string, error: unknown, defaultMessage: string): void {
      let message = defaultMessage;
      let metadata: Record<string, unknown> | undefined;

      if (error instanceof Error) {
        message = error.message;
        metadata = { stack: error.stack };
      } else if (typeof error === 'object' && error !== null) {
        metadata = { error };
      }

      this.setError(key, message, { metadata });
    },

    setValidationError(key: string, message: string, metadata?: Record<string, unknown>): void {
      this.setError(key, message, { metadata });
    },

    setAuthError(key: string, message: string, metadata?: Record<string, unknown>): void {
      this.setError(key, message, { metadata, isGlobal: true });
    },

    setNetworkError(key: string, message?: string): void {
      this.setError(key, message || 'Network error occurred. Please check your connection and try again.', {
        isGlobal: true,
      });
    },
  },
});
