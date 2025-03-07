<script lang="ts" setup>
import { ApiRepository, FileDto } from '#api/data';
import { pages } from '../../pages';

const props = defineProps({
  file: {
    type: Object as () => FileDto,
    required: true,
  },
  removable: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['delete']);

const app = useNuxtApp();

const loading = ref(false);

const handleDelete = async (id: string) => {
  const deletedFile = await app.$di.resolve(ApiRepository).files.deleteFile({ id });
  emits('delete', id);
};

const isImage = computed(
  () =>
    props.file.contentType === 'image/jpeg' ||
    props.file.contentType === 'image/png' ||
    props.file.contentType === 'image/jpg',
);
</script>

<template>
  <div class="relative">
    <div v-if="removable" class="absolute flex gap-2 right-0 p-1 z-10 bg-white rounded-s">
      <Icon
        name="Download"
        @click="downloadFile(file.url, file.name)"
        size="md"
        class="cursor-pointer active:scale-90"
      />
      <Confirm @confirm="handleDelete(file.id)">
        <Icon name="Trash" size="md" class="text-red-500 cursor-pointer active:scale-90" />
      </Confirm>
    </div>

    <nuxt-link :to="{ name: pages.filesItem, params: { id: file.id } }">
      <span v-if="isImage" class="h-32 rounded-md shadow cursor-pointer">
        <Image :src="file.url" alt="File thumbnail" />
      </span>
      <div v-else class="group flex justify-center items-center h-32 shadow rounded-md cursor-pointer">
        <Icon name="File" size="xl" class="transition-all group-hover:scale-105" />
      </div>
    </nuxt-link>

    <div class="my-2 space-y-1 text-sm font-medium truncate ...">{{ file.name }}</div>
    <div class="text-xs hidden">{{ file.id }}</div>
  </div>
</template>
