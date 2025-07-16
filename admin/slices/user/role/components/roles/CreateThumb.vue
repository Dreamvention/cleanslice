<script lang="ts" setup>
import { RolesService, TeamUsersService } from '#api';
import { defineProps, defineEmits } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

defineProps<{
  loading: boolean;
}>();

const emits = defineEmits<{ (e: 'create', value: any): void }>();
const open = ref(false);
const _loading = ref(false);
const availablePermissions = ref<string[]>([]);

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  permissions: z.array(z.string()).min(1),
}))

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    permissions: [] as string[]
  },
})

const groupedPermissions = computed(() => {
  const groups: Record<string, string[]> = {};
  availablePermissions.value.forEach(permission => {
    const [group] = permission.split(':');
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(permission);
  });
  return groups;
});

const fetchPermissions = async () => {
  try {
    const result = await TeamUsersService.getTeamUserPermissions();
    if (result.data?.data?.permissions) {
      availablePermissions.value = result.data.data.permissions;
    }
  } catch (e) {
    console.error('Failed to fetch permissions:', e);
  }
};

onMounted(() => {
  fetchPermissions();
});

const onSubmit = handleSubmit(async (values) => {
  try {
    _loading.value = true;
    const result = await RolesService.createRole({
      body: {
        name: values.name,
        permissions: values.permissions || []
      },
    });

    emits('create', result);
    _loading.value = false;
    open.value = false;
  } catch (e) {
    console.error(e);
  } finally {
    _loading.value = false;
  }
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button>Create role</Button>
    </DialogTrigger>

    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create role</DialogTitle>
        <DialogDescription>Set name and permissions for role.</DialogDescription>
      </DialogHeader>
      <div>
        <form class="space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Role name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" :model-value="componentField.modelValue"
                  placeholder="Enter name for role...">
                </Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="permissions">
            <FormItem>
              <FormLabel>Permissions</FormLabel>
              <ScrollArea class="h-[300px] rounded-md border p-4">
                <div class="space-y-6">
                  <div v-for="(permissions, group) in groupedPermissions" :key="group" class="space-y-2">
                    <h4 class="text-sm font-medium text-muted-foreground capitalize">{{ group }}</h4>
                    <div class="grid grid-cols-2 gap-2">
                      <div v-for="permission in permissions" :key="permission" class="flex items-center space-x-2">
                        <Checkbox v-bind="componentField" :value="permission"
                          :checked="componentField.modelValue?.includes(permission)" @update:checked="(checked: boolean) => {
                            const currentValue = componentField.modelValue || [];
                            if (checked) {
                              componentField.onChange([...currentValue, permission]);
                            } else {
                              componentField.onChange(currentValue.filter((p: string) => p !== permission));
                            }
                          }" />
                        <Label class="text-sm">{{ permission.split(':')[1] }}</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex justify-end space-x-2">
            <Button type="button" variant="outline" @click="open = false">
              Cancel
            </Button>
            <Button type="submit" :disabled="_loading">
              Create
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>
