<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { Separator, type SeparatorProps } from 'radix-vue';
import { cn } from '~/slices/theme/utils/cn';

const props = defineProps<SeparatorProps & { class?: HTMLAttributes['class'] } & { title?: string }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <div class="relative">
    <Separator
      v-bind="delegatedProps"
      :class="
        cn(
          'shrink-0 bg-border absolute inset-0flex items-center',
          props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
          props.class,
        )
      "
    />
    <div v-if="title" class="absolute flex justify-center w-full text-xs uppercase -mt-2">
      <span class="bg-background px-2 text-muted-foreground"> {{ title }} </span>
    </div>
  </div>
</template>
