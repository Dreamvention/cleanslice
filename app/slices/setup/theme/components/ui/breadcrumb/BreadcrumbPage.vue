<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { cn } from '#theme/utils/cn';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <span role="link" aria-disabled="true" aria-current="page" :class="cn('font-normal text-foreground', props.class)">
    <slot />
  </span>
</template>
