<script lang="ts" setup>
// @scope:app
// @slice:chat/chat
// @layer:presentation
// @type:component

import { useChat } from '@ai-sdk/vue';

const { messages, input, handleSubmit, error } = useChat({
  api: 'http://localhost:3333/ai/completion',
});

const formatMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
};

const isThinking = ref(false);

const handleScheduleCall = async () => {
  input.value = 'Please return me the current amount of users!';
  handleSubmit();
};

const handleSubmitWithThinking = async () => {
  isThinking.value = true;
  await handleSubmit();
  isThinking.value = false;
};
</script>

<template>
  <div>
    <div
      @click="handleScheduleCall"
      class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Schedule a call
    </div>

    <!-- Thinking Indicator -->
    <div
      v-if="isThinking"
      class="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-lg"
    >
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <strong class="text-purple-700 text-sm font-semibold">🤔 AI is thinking...</strong>
      </div>
      <div class="text-sm text-gray-600 mt-2">
        The AI is processing your request and may use tools to gather information.
      </div>
    </div>

    <div v-if="messages" class="mt-4">
      <div class="font-bold mb-2">Conversation:</div>
      <div class="space-y-4">
        <div v-for="message in messages" :key="message.id" class="flex flex-col">
          <div
            :class="[
              'px-4 py-2 rounded max-w-xl',
              message.role === 'user' ? 'bg-gray-200 self-end text-right' : 'bg-green-100 self-start text-left',
            ]"
          >
            <template v-if="message.parts && message.parts.length">
              <template v-for="(part, idx) in message.parts" :key="idx">
                <!-- Text Response -->
                <template v-if="part.type === 'text'">
                  <div v-html="formatMarkdown(part.text)" class="prose prose-sm max-w-none"></div>
                </template>

                <!-- Tool Call (MCP Request) -->
                <template v-else-if="part.type === 'tool-invocation'">
                  <div class="mt-2 p-2 bg-yellow-100 rounded text-sm">
                    <strong>MCP Request:</strong><br />
                    <pre class="mt-1 bg-white p-2 rounded border border-gray-300 overflow-auto text-xs">{{
                      JSON.stringify(part, null, 2)
                    }}</pre>
                  </div>
                </template>

                <!-- Tool Result (MCP Response) -->
                <template v-else-if="part.type.startsWith('data-')">
                  <div class="mt-2 p-2 bg-blue-100 rounded text-sm">
                    <strong>MCP Response:</strong><br />
                    <pre class="mt-1 bg-white p-2 rounded border border-gray-300 overflow-auto text-xs">{{
                      JSON.stringify(part, null, 2)
                    }}</pre>
                  </div>
                </template>

                <!-- Reasoning/Thinking Step -->
                <template v-else-if="part.type === 'reasoning'">
                  <div
                    class="mt-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 rounded-lg"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <strong class="text-purple-700 text-sm font-semibold">🤔 AI is thinking...</strong>
                    </div>
                    <div class="text-sm text-gray-700 leading-relaxed">{{ part.text }}</div>
                  </div>
                </template>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">Error: {{ error.message }}</div>

    <form @submit.prevent="handleSubmitWithThinking" class="mt-4">
      <div class="flex gap-2">
        <input
          v-model="input"
          type="text"
          placeholder="Enter your message..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>
