<script setup lang="ts">
import { TeamsService } from '#api/data';
const app = useNuxtApp();
// const props = defineProps<{
//   modelValue: string;
//   // placeholder: string;
//   // options: { label: string; value: string }[];
// }>();

// const emit = defineEmits<{
//   (e: 'update:modelValue', value: string): void;
// }>();

const { data, status, error, refresh } = useAsyncData('teams', () => TeamsService.getTeams());

// const selectedAgent = computed({
//   get: () => props.modelValue,
//   set: (value) => {
//     console.log(value);
//     emit('update:modelValue', value);
//   },
// });

const options = computed(() => {
  return (
    data.value?.data?.data?.map((item) => {
      return { label: item.name, value: item.id as string };
    }) || []
  );
});
</script>
<template>
  <Select placeholder="Select an team" :options="options" />
</template>
