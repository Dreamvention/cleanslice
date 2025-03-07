<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import SelectProvider from '../select/SelectProvider.vue';
import type { SelectRootEmits, SelectRootProps, SelectTrigger } from 'radix-vue';
// import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<SelectRootProps & { placeholder: string; options: { label: string; value: string }[] }>();
const emits = defineEmits<SelectRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const search = ref();

const filteredOptions = computed(() => {
  if (!search.value) return props.options;
  if (!props.options) return [];
  return props.options.filter((option) => {
    return option.label.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>

<template>
  {{ options }}
  <SelectProvider v-bind="forwarded">
    <SelectTrigger>
      <Input v-model="search" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="option in filteredOptions" :key="option.value">
        <SelectItem :value="option.value"> {{ option.label }} </SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectProvider>
</template>
