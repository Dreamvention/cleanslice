<script lang="ts" setup>
import { UserDto } from '#api/data';

defineProps({
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
  loading: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <UsersUpdateForm v-if="!loading" :user="user" />
</template>
