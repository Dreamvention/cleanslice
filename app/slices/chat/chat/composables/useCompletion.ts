// @scope:app
// @slice:chat/chat
// @layer:presentation
// @type:composable

import { useCompletion as useAiCompletion } from '@ai-sdk/vue';

export interface UseCompletionOptions {
  api?: string;
  onResponse?: (response: Response) => void | Promise<void>;
  onFinish?: (prompt: string, completion: string) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
}

export interface UseCompletionReturn {
  completion: Ref<string>;
  complete: (prompt: string) => Promise<string | null | undefined>;
  isLoading: Ref<boolean | undefined>;
  error: Ref<Error | undefined>;
  stop: () => void;
}

export const useCompletion = (options: UseCompletionOptions = {}): UseCompletionReturn => {
  const { completion, complete, isLoading, error, stop } = useAiCompletion({
    api: options.api || '/ai/completion',
    onResponse: options.onResponse,
    onFinish: options.onFinish,
    onError: options.onError,
  });

  return {
    completion,
    complete,
    isLoading,
    error,
    stop,
  };
};
