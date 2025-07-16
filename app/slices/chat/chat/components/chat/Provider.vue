<script lang="ts" setup>
// @scope:app
// @slice:chat/chat
// @layer:presentation
// @type:component

import { useCompletion } from '@ai-sdk/vue';

const { completion, input, handleSubmit, isLoading, error } = useCompletion({
  api: 'http://localhost:3333/ai/completion',
});

const handleScheduleCall = async () => {
  // Set the input and submit
  input.value = 'Please return me the current amount of users!';
  await handleSubmit();
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

    <div v-if="completion" class="mt-4">
      <div class="font-bold">AI Response:</div>
      <div>{{ completion }}</div>
    </div>

    <div v-if="isLoading" class="mt-4 text-gray-500">Loading...</div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">Error: {{ error.message }}</div>
  </div>
</template>
