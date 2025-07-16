<script lang="ts" setup>
import { watch } from 'vue';
import { UserDto } from '#api';

const emits = defineEmits(['submit']);
const props = defineProps({
  user: {
    type: Object as () => UserDto,
    required: false,
    default: () => ({
      id: '',
      name: '',
      email: '',
      adminRole: '',
      verified: false,
      banned: false,
      roles: [],
      createdAt: '',
      updatedAt: '',
    }),
  },
});

const { form, onSubmit, roles } = useFormUsers(props.user);

// Оновлення форми при зміні user
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.setValues({
        name: newUser.name,
        email: newUser.email,
        adminRole: newUser.adminRole,
        banned: newUser.banned,
        verified: newUser.verified,
      });
    }
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name" key="1">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Name" />
        </FormControl>
        <FormDescription>Give a Name to your User</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email" key="2">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="email" placeholder="Email" />
        </FormControl>
        <FormDescription>Give an Email to your User</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="adminRole" key="3">
      <FormItem>
        <FormLabel>Role</FormLabel>
        <Select
          v-bind="componentField"
          :update:model-value="componentField['onUpdate:modelValue']"
          placeholder="Select a role"
          :options="roles"
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="role in roles" :key="role.value" :value="role.value">
                {{ role.label }}
              </SelectItem>
            </SelectContent>
          </FormControl>
        </Select>
        <FormDescription>Select a Role for your User</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="banned" key="4" type="checkbox">
      <FormItem>
        <FormLabel class="mr-4">Banned</FormLabel>
        <FormControl>
          <Switch :checked="value" @update:checked="handleChange" />
        </FormControl>
        <FormDescription>Set banned to true if the user is banned</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="verified" :key="5" type="checkbox">
      <FormItem>
        <FormLabel class="mr-4">Verified</FormLabel>
        <FormControl>
          <Switch :checked="value" @update:checked="handleChange" />
        </FormControl>
        <FormDescription>Set verified to true if the user is verified</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit">Save</Button>
  </form>
</template>
