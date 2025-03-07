<script lang="ts" setup>
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue';
import { DialogTrigger } from '../dialog';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
<template>
  <Dialog v-bind="forwarded">
    <DialogTrigger><slot name="trigger"></slot></DialogTrigger>
    <DialogContent class="max-w-[60rem] p-0 gap-0 shadow-xl">
      <slot name="header"> </slot>

      <div class="flex h-[70vh] grid grid-cols-[230px_minmax(0,1fr)]">
        <aside class="py-l bg-secondary flex flex-col shrink-0 h-[70vh] top-0 border-r rounded-s-lg">
          <slot name="side"></slot>
        </aside>
        <div class="relative re w-full flex flex-grow flex-col items-center p-4 overflow-y-auto">
          <slot></slot>
        </div>
      </div>
      <slot name="footer"> </slot>
    </DialogContent>
  </Dialog>
</template>
