<script setup lang="ts">
import { TeamsService, UpdateTeamDto } from '#api';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useToast } from '~/slices/theme/components/ui/toast/use-toast';

defineProps<{
  loading: boolean;
}>();
const userId = ref<string>();
const emits = defineEmits<{ (e: 'update', value: any): void }>();
const route = useRoute();
const _loading = ref(false);

const { data, pending } = useAsyncData('teams', () =>
  TeamsService.getAdminTeam({
    path: {
      id: route.params.teamId as string,
    },
  }),
);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    codename: z.string().min(2).max(50),
    userId: z.string().nonempty(),
    onborded: z.boolean().optional(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

watch(
  () => userId.value,
  () => {
    form.values.userId = userId.value;
  },
);

const onSubmit = form.handleSubmit(async (values) => {
  try {
    _loading.value = true;
    const body = {
      name: values.name,
      codename: values.codename,
      userId: values.userId,
      onborded: values.onborded,
    } as UpdateTeamDto;

    const result = await TeamsService.updateAdminTeam({
      path: {
        id: route.params.teamId as string,
      },
      body,
    });
    if (result.status === 200) {
      useToast().toast({
        title: 'Team updated',
        description: 'Team updated successfully',
      });
    }
    emits('update', result);
    _loading.value = false;
  } catch (e) {
    console.log(e);
    _loading.value = false;
  }
});
</script>
<template>
  <div v-if="pending">Loading...</div>
  <form v-else class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" :value="data?.data?.data?.name" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Name" />
        </FormControl>
        <FormDescription> Give a name to your Team</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" :value="data?.data?.data?.codename" name="codename">
      <FormItem>
        <FormLabel>Codename</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Codename" />
        </FormControl>
        <FormDescription> Give a codename to your Team</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" :value="data?.data?.data?.userId" name="userId">
      <FormItem>
        <FormLabel>Owner</FormLabel>
        <FormControl>
          <UsersFormAutocomplete v-bind="componentField" placeholder="Owner" />
        </FormControl>
        <FormDescription> Give owner of your Team</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="onborded" :value="data?.data?.data?.onborded">
      <FormItem>
        <FormLabel class="mr-4">Onboarded </FormLabel>
        <FormControl>
          <Switch :checked="value" @update:checked="handleChange" />
        </FormControl>
        <FormDescription>Set onboarded to true if the team is onboarded</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button type="submit"> Save </Button>
    </DialogFooter>
  </form>
</template>
