<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue';
import { cn } from '#theme/utils/cn';
import { buttonVariants } from '#theme/components/ui/button';

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="cn(buttonVariants(), props.class)">
    <slot />
  </AlertDialogAction>
</template>
