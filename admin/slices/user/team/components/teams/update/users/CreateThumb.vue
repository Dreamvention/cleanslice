<script lang="ts" setup>
import { RolesService, TeamUsersService, UsersService } from '#api';
import { defineProps, defineEmits } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useToast } from '~/slices/theme/components/ui/toast/use-toast';

defineProps<{
  loading: boolean;
}>();

const emits = defineEmits<{ (e: 'create', value: any): void }>();
const open = ref(false);
const email = ref<string | undefined>(undefined);
const route = useRoute();
const _loading = ref(false);
const roleItems = ref<{ label: string; value: string }[]>([]);
const response = await RolesService.getRoles();
const roles = response.data?.data;
roles?.map((role) => {
  roleItems.value.push({
    label: role.name,
    value: role.id,
  });
});
const selectRole = ref<string | undefined>(undefined);
const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(50).email(),
    role: z.string().min(2).nonempty(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    role: '',
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    _loading.value = true;

    const result = await TeamUsersService.createTeamUser({
      path: {
        id: route.params.teamId as string,
      },
      body: {
        email: values.email,
        roleId: values.role,
      },
    });
    if (result.status === 201) {
      useToast().toast({
        title: 'User created',
        description: 'User created successfully',
      });
    }
    emits('create', result);
  } catch (e) {
    console.log(e);
  } finally {
    _loading.value = false;
    open.value = false;
  }
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button>Add user</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add user</DialogTitle>
        <DialogDescription> Invite new user with email </DialogDescription>
      </DialogHeader>
      <div v-if="!email">
        <form class="space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <TeamsUpdateUsersAutocomplete v-bind="componentField" no-data-text="Send an invitation by email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="role">
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select v-bind="componentField" :placeholder="'Select a role'" :options="roleItems">
                  <SelectTrigger>
                    <SelectValue :value="selectRole" placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="role in roleItems" :key="role.value" :value="role.value">
                        {{ role.label }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <DialogFooter>
            <Button type="submit"> Save </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>
