<script lang="ts" setup>
import { RolesService, TeamsService, TeamUsersService, UsersService } from '#api';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { DateRangePickerAnchor } from 'radix-vue';

defineProps<{
  loading: boolean;
}>();

const emits = defineEmits<{ (e: 'update', value: any): void }>();
const route = useRoute();
console.log(route.params);
const teamsStore = useTeamsStore();
const selectRole = ref<string | undefined>(undefined);
const roleItems = ref<{ label: string; value: string }[]>([]);
const response = await RolesService.getRoles();
const roles = response.data?.data;
roles?.map((role) => {
  roleItems.value.push({
    label: role.name,
    value: role.id,
  });
});
const _loading = ref(false);
const team = await TeamsService.getTeam({
  path: {
    id: route.params.teamId as string,
  },
});
const { data, pending } = useAsyncData('teamUsers', () =>
  TeamUsersService.getTeamUser({
    path: {
      id: team.data?.data?.id as string,
      teamUserId: route.params.id as string,
    },
  }),
);

watch(
  () => data.value?.data?.data,
  (newValue) => {
    if (newValue) {
      selectRole.value = newValue.roleId;
    }
  },
);

const formSchema = toTypedSchema(
  z.object({
    role: z.string().min(2).max(50),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    _loading.value = true;

    const result = await TeamUsersService.updateTeamUser({
      path: {
        id: team.data?.data?.id as string,
        teamUserId: route.params.id as string,
      },
      body: {
        roleId: values.role,
      },
    });

    emits('update', result);
    _loading.value = false;
  } catch (e) {
    console.log(e);
    _loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-2xl">
    <div v-if="pending">Loading...</div>
    <form v-else class="space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" :value="selectRole" name="role">
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
</template>
