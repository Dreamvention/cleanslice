<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { UsersService, UpdateUserDto, UserDto } from '#api/data';

const props = defineProps<{
  user: UserDto;
}>();

const app = useNuxtApp();
const emits = defineEmits<{ (e: 'update', value: any): void }>();
const loading = ref(false);
const isOpen = ref(false);

const formSchema = z.object({
  name: z.string().describe('Name').default(props.user.name),
  email: z.string().describe('Email').default(props.user.email),
  emailNotifications: z.boolean().describe('Email Notifications').default(props.user.emailNotifications),
});

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
});

const submit = form.handleSubmit(async (values) => {
  loading.value = true;
  try {
    const requestBody = {
      name: values.name,
      email: values.email,
      emailNotifications: values.emailNotifications,
    } as UpdateUserDto;

    const result = await UsersService.updateUser({ id: props.user.id, requestBody });
    isOpen.value = false;
    loading.value = false;
    emits('update', result);
  } catch (e) {
    console.log(e);
    loading.value = false;
  }
});
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger>
      <Button>Edit Profile</Button>
    </DialogTrigger>
    <DialogScrollContent>
      <DialogHeader>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogDescription> Update you Account details </DialogDescription>
      </DialogHeader>
      <form class="space-y-6" :schema="formSchema" :form="form" @submit="submit">
        <FormField v-slot="{ componentField }" name="name" :value="user.name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="text" placeholder="Name" />
            </FormControl>
            <FormDescription> Give a public name. This will be shown for Public Agents as Owned by.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email" :value="user.email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="text" placeholder="Email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ value, handleChange }" :value="user.emailNotifications" name="emailNotifications">
          <FormItem>
            <div class="space-y-0.5">
              <FormLabel class="text-base"> Email Notifications </FormLabel>
              <FormDescription> Do you want to receive email notifications? </FormDescription>
            </div>
            <FormControl>
              <Switch :checked="value" @update:checked="handleChange" />
            </FormControl>
          </FormItem>
        </FormField>

        <Button type="submit" class="mt-2" :loading="loading" :disabled="loading">Save</Button>
      </form>
    </DialogScrollContent>
  </Dialog>
</template>
