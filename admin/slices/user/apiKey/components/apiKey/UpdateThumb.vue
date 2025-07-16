<script lang="ts" setup>
import { ApiKeysService, UpdateApiKeyDto } from '#api';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

defineProps<{
  loading: boolean;
}>();

const emits = defineEmits<{ (e: 'update', value: any): void }>();
const route = useRoute();
const router = useRouter();
const teamsStore = useTeamsStore();
const open = computed({
  get: () => true,
  set: (value) => {
    if (!value) {
      router.back();
    }
  },
});
const _loading = ref(false);

const { data, pending } = useAsyncData('apiKey', () =>
  ApiKeysService.getApiKey({
    path: {
      id: route.params.id as string,
    }
  }),
);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    _loading.value = true;
    const body = {
      name: values.name,
    } as UpdateApiKeyDto;

    const result = await ApiKeysService.updateApiKey({
      path: {
        id: route.params.id as string,
      },
      body
    });

    emits('update', result);
    _loading.value = false;
    open.value = false;
  } catch (e) {
    console.log(e);
    _loading.value = false;
  }
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Source</DialogTitle>
        <DialogDescription> Update you Source </DialogDescription>
      </DialogHeader>
      <div v-if="pending">Loading...</div>
      <form v-else class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" :value="data?.data?.data?.name" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="text" placeholder="Name" />
            </FormControl>
            <FormDescription> Give a name to your API Key</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button type="submit"> Save </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
