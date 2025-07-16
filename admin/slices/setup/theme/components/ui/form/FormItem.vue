<script lang="ts">
import type { HTMLAttributes, InjectionKey } from 'vue';
import { FORM_ITEM_INJECTION_KEY } from './formItem';
</script>

<script lang="ts" setup>
import { provide } from 'vue';
import { useId } from 'radix-vue';
import { cn } from '#theme/utils/cn';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot />
  </div>
</template>
