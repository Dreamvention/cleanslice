import { computed } from 'vue';
import { useErrorStore, type ErrorInfo, type ErrorOptions } from '../stores/error';

export const useError = () => {
  const store = useErrorStore();

  // Computed properties
  const globalError = computed(() => store.getGlobalError);
  const hasGlobalError = computed(() => store.hasGlobalError);

  // Error management
  const getError = (key: string): ErrorInfo | null => {
    return store.getError(key);
  };

  const hasError = (key: string): boolean => {
    return store.hasError(key);
  };

  const setError = (key: string, message: string, options: ErrorOptions = {}): void => {
    store.setError(key, message, options);
  };

  const clearError = (key: string): void => {
    store.clearError(key);
  };

  const clearGlobalError = (): void => {
    store.clearGlobalError();
  };

  const clearAllErrors = (): void => {
    store.clearAllErrors();
  };

  // Utility methods
  const setApiError = (key: string, error: unknown, defaultMessage: string): void => {
    store.setApiError(key, error, defaultMessage);
  };

  const setValidationError = (key: string, message: string, metadata?: Record<string, unknown>): void => {
    store.setValidationError(key, message, metadata);
  };

  const setAuthError = (key: string, message: string, metadata?: Record<string, unknown>): void => {
    store.setAuthError(key, message, metadata);
  };

  const setNetworkError = (key: string, message?: string): void => {
    store.setNetworkError(key, message);
  };

  // Error handling wrapper for async operations
  const handleAsync = async <T>(key: string, operation: () => Promise<T>, errorMessage: string): Promise<T | null> => {
    try {
      return await operation();
    } catch (error) {
      setApiError(key, error, errorMessage);
      return null;
    }
  };

  return {
    // State
    globalError,
    hasGlobalError,

    // Methods
    getError,
    hasError,
    setError,
    clearError,
    clearGlobalError,
    clearAllErrors,

    // Utility methods
    setApiError,
    setValidationError,
    setAuthError,
    setNetworkError,
    handleAsync,
  };
};
