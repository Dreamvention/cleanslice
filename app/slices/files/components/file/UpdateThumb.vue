<script lang="ts" setup>
import { FilesService } from '#api/data';

const emits = defineEmits(['update']);
const app = useNuxtApp();
const route = useRoute();
const _loading = ref(false);

const { data, pending, error, refresh } = useAsyncData('file', () =>
  FilesService.getFile({ id: route.params.id as string }),
);

const router = useRouter();

const open = computed({
  get: () => true,
  set: (value) => {
    if (!value) {
      router.back();
    }
  },
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>File Details</DialogTitle>
        <DialogDescription> View your File details </DialogDescription>
      </DialogHeader>
      <div class="space-y-1">
        <Label>Name</Label>
        <Input v-if="data?.data?.data" type="text" disabled v-model="data.data.data.name" />
      </div>
      <div class="space-y-1">
        <Label>Type</Label>
        <Input v-if="data?.data?.data" type="text" disabled v-model="data.data.data.contentType" />
      </div>
      <div class="space-y-1">
        <Label>Url</Label>
        <Input v-if="data?.data?.data" type="text" disabled v-model="data.data.data.url" />
      </div>
    </DialogContent>
  </Dialog>
</template>
