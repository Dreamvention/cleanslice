<script lang="ts" setup>
import { FilesService, UploadFileDto } from '#api/data';
import axios from 'axios';
defineProps<{
  loading?: boolean;
}>();

const _loading = ref(false);
const emits = defineEmits(['upload']);

const app = useNuxtApp();

const inputFile = ref<HTMLInputElement>();
const openUpload = () => {
  inputFile.value?.click();
};

const handleUpload = async () => {
  try {
    _loading.value = true;

    const file = {
      name: inputFile.value?.files?.[0].name ?? '',
      type: 'image',
      file: inputFile.value?.files?.[0],
    } as UploadFileDto;

    const result = await FilesService.getSignedUrl({
      path: inputFile.value?.files?.[0].name ?? '',
      contentType: inputFile.value?.files?.[0].type ?? '',
    });

    await axios.put(result?.data?.data?.url, file.file, {
      headers: {
        'Content-Type': file.file.type,
      },
      onUploadProgress: (e) => {
        //  Show progress
        var percentCompleted = Math.round((e.loaded * 100) / (e.total ?? 1));
        console.log('percentCompleted', percentCompleted);
      },
    });
    const uploadedFile = await FilesService.createFile({
      body: {
        contentType: file.file.type,
        name: inputFile.value?.files?.[0].name ?? '',
        path: result?.data?.path ?? '',
      },
    });
    emits('upload', uploadedFile?.data?.data);
    _loading.value = false;
  } catch (e) {
    console.log(e);
    _loading.value = false;
  }
};
</script>

<template>
  <div @click="openUpload">
    <div
      class="group flex justify-center items-center h-32 border border-dotted border-2 rounded-md cursor-pointer hover:bg-slate-50"
    >
      <Icon
        v-if="_loading || loading"
        name="Loader2"
        size="xl"
        class="animate-spin transition-all group-hover:scale-105"
      />
      <Icon v-else name="Upload" size="xl" class="transition-all group-hover:scale-105" />
      <input ref="inputFile" type="file" class="opacity-0" hidden @change="handleUpload" />
    </div>

    <div class="my-2 space-y-1 text-sm font-medium text-center">Upload</div>
  </div>
</template>
