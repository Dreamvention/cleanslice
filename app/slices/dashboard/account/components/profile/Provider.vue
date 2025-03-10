<script lang="ts" setup>
import { AuthService, UserDto } from '#api/data';

const app = useNuxtApp();

const { data, pending, error, refresh } = useAsyncData('profile', () => AuthService.me());
</script>

<template>
  <div>
    <ProfileForm v-if="!pending" :user="data?.data" @update="refresh" />
    <div class="mb-5"></div>
    <ProfileItem :pending="pending" :user="data?.data" />
  </div>
</template>
