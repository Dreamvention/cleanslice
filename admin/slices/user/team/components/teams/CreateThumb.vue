<script lang="ts" setup>
import { TeamsService, CreateTeamDto } from '#api';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ref } from 'vue';
import { show } from '@unovis/ts/components/tooltip/style';

defineProps<{
  loading: boolean;
}>();
const creating = ref<boolean>(false);
const emits = defineEmits<{ (e: 'create', value: any): void }>();
const open = ref(false);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(20),
    codename: z.string().min(3).max(20),
    userId: z.string().nonempty(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    creating.value = true;
    const body = {
      name: values.name,
      codename: values.codename,
      userId: values.userId,
    } as CreateTeamDto;
    const result = await TeamsService.createTeam({ body });
    creating.value = false;
    open.value = false;
    emits('create', result);
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button>Create Team</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Team</DialogTitle>
        <DialogDescription> Create your Team </DialogDescription>
      </DialogHeader>
      <div>
        <form class="space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="text" placeholder="Name" />
              </FormControl>
              <FormDescription> Give a name to your Team</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="codename">
            <FormItem>
              <FormLabel>Codename</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="text" placeholder="Codename" />
              </FormControl>
              <FormDescription> Give a codename to your Team</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="userId">
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <UsersFormAutocomplete v-bind="componentField" type="text" label="Owner" />
              </FormControl>
              <FormDescription> Give owner of your Team</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <DialogFooter>
            <Button :loading="creating" :disabled="creating" type="submit"> Save </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>
