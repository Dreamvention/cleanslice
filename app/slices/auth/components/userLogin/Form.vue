<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

defineProps<{ loading: boolean }>();

const emit = defineEmits<{ (e: 'submit', data: { email: string; password: string }): void }>();

const formData = ref({
  email: '',
  password: '',
});

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(), // Email validation with proper format
    password: z.string(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  emit('submit', { email: values.email, password: values.password });
});
</script>
<template>
  <form class="space-y-2" @submit="onSubmit">
    <div>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel class="sr-only">Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="name@example.com" v-bind="componentField" :disabled="loading" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel class="sr-only">Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Password" v-bind="componentField" :disabled="loading" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="grid">
      <Button :loading="loading" type="submit"> Sign In with Email </Button>
    </div>

    <!-- <Separator title="Or continue with" />
    <Button variant="outline" type="button" :loading="isLoading">
      <Icon name="GitHubLogo" class="mr-2 h-4 w-4" />
      GitHub
    </Button> -->
  </form>
</template>
