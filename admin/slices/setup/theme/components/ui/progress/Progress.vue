<script setup lang="ts">
import { cn } from '#theme/utils/cn';
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import { type ProgressVariants, progressVariants } from '.';

interface Props extends ProgressRootProps {
  variant?: ProgressVariants['variant'];
  size?: ProgressVariants['size'];
  class?: HTMLAttributes['class'];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="cn('relative w-full overflow-hidden rounded-full bg-secondary', progressVariants({ size }), props.class)"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 transition-all"
      :class="cn('bg-primary', progressVariants({ variant }))"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
