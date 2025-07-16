<script lang="ts" setup>
import { FilesService, FileDto } from '#api/data';

const emit = defineEmits<{
  (e: 'select', value: FileDto): void;
}>();

const app = useNuxtApp();

const { data, pending, error, refresh } = useAsyncData('files', () => FilesService.getFiles());

const handleClick = (file: any) => {
  console.log(file);
  emit('select', file);
};
</script>

<template>
  <div class="grid grid-cols-6 gap-4 items-start">
    <FileUploadThumb @upload="refresh" :loading="pending" />
    <SkeletonsThumb v-if="!data && pending" v-for="item in [1, 2, 3]" :key="item" />
    <FileThumb
      v-if="data"
      v-for="file in data?.data?.data"
      :key="file.id"
      :file="file"
      @delete="refresh"
      @click="handleClick(file)"
      removable
    />
  </div>
</template>
