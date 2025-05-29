<script lang="ts" setup>
import { ApiKeysService, CreateApiKeyDto } from '#api';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

defineProps<{
  loading: boolean;
}>();

const emits = defineEmits<{ (e: 'create', value: any): void }>();
const app = useNuxtApp();
const open = ref(false);
const apiKey = ref<string | undefined>(undefined);
const _loading = ref(false);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  apiKey.value = undefined;
  try {
    _loading.value = true;
    const requestBody = {
      name: values.name,
    } as CreateApiKeyDto;

    const result = await ApiKeysService.createApiKey({ requestBody });

    apiKey.value = result?.data?.secret;
    emits('create', result);
    _loading.value = false;
  } catch (e) {
    console.log(e);
    _loading.value = false;
  }
});

const sourceType = ref<{ name: string; value: string; component: string } | null>(null);

const copyCode = () => {
  if (apiKey.value) {
    isCopied.value = true;
    navigator.clipboard
      .writeText(apiKey.value)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }
};

const isCopied = ref(false);
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button>Create Api Key</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Api Key</DialogTitle>
        <DialogDescription> Create your Api Key </DialogDescription>
      </DialogHeader>

      <div v-if="!apiKey">
        <form class="space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
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
      </div>
      <div v-else>
        <FormField v-slot="{ componentField }" name="apiKey">
          <FormItem>
            <FormLabel>Api Key</FormLabel>
            <FormControl>
              <div class="flex w-full max-w-full items-center gap-1.5">
                <Input type="text" placeholder="Api Key" v-model="apiKey" class="flex-1" />
                <Button @click="copyCode"> {{ isCopied ? 'Copied!' : 'Please, copy this key' }}</Button>
              </div>
            </FormControl>
            <FormDescription>
              Copy your API key and replace it in the Agent Chat script. You will not see this code
              again.</FormDescription
            >
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </DialogContent>
  </Dialog>
</template>
