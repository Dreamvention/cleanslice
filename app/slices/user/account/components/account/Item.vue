<script lang="ts" setup>
import { UserDto } from '#api';

defineProps<{
  user: UserDto;
  pending: boolean;
}>();
</script>

<template>
  <div class="py-2">
    <div class="font-bold">Name</div>
    <Skeleton v-if="!user && pending" class="h-3 mt-2 w-[150px]" />
    <div v-if="user" class="text-sm text-muted-foreground">{{ user.name }}</div>
  </div>

  <div class="py-2">
    <div class="font-bold">Email</div>
    <Skeleton v-if="!user && pending" class="h-3 mt-2 w-[150px]" />
    <div v-if="user" class="text-sm text-muted-foreground">{{ user.email }}</div>
  </div>

  <div class="py-2">
    <div class="font-bold">Email Notifications</div>
    <Skeleton v-if="!user && pending" class="h-3 mt-2 w-[150px]" />
    <div v-if="user" class="text-sm text-muted-foreground">{{ user.emailNotifications ? 'On' : 'Off' }}</div>
  </div>
</template>
