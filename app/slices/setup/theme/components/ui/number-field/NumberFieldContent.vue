<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '#theme/utils/cn';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div :class="cn('relative', props.class)">
    <slot />
  </div>
</template>
