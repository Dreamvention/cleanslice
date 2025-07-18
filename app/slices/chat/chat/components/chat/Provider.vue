<script lang="ts" setup>
// @scope:app
// @slice:chat/chat
// @layer:presentation
// @type:component

import { useChat } from '@ai-sdk/vue';

const { messages, input, handleSubmit, error } = useChat({
  api: 'http://localhost:3333/ai/completion',
})

const formatMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
};

const handleScheduleCall = async () => {
  // Set the input and submit
  input.value = 'Please return me the current amount of users!';
  handleSubmit();
};
</script>

<template>
  <div>
    <div @click="handleScheduleCall"
      class="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      Schedule a call
    </div>

    <div v-if="messages" class="mt-4">
      <div class="font-bold">AI Response:</div>
      <div class="space-y-4">
        <div v-for="message in messages" :key="message.id" class="flex flex-col">
          <div :class="[
            'px-4 py-2 rounded max-w-xl',
            message.role === 'user'
              ? 'bg-gray-200 self-end text-right'
              : 'bg-green-100 self-start text-left'
          ]">
            <template v-if="message.parts && message.parts.length">
              <template v-for="(part, idx) in message.parts" :key="idx">
                <!-- Текстовые части -->
                <template v-if="part.type === 'text'">
                  <div v-html="formatMarkdown(part.text)" class="prose prose-sm max-w-none"></div>
                </template>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">Error: {{ error.message }}</div>

    <form @submit.prevent="handleSubmit" class="mt-4">
      <div class="flex gap-2">
        <input v-model="input" type="text" placeholder="Enter your message..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <button type="submit"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
          Send
        </button>
      </div>
    </form>
  </div>
</template>
