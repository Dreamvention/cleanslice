<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'radix-vue';
import { cn } from '#theme/utils/cn';

const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputInput
    v-bind="forwardedProps"
    :class="cn('text-sm min-h-6 focus:outline-none flex-1 bg-transparent px-1', props.class)"
  />
</template>
