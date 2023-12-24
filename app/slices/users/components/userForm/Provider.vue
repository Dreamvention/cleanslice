<template>
  <UserForm :item="item" @save="onSave" />
</template>

<script lang="ts" setup>
import { ApiRepository, UserDto } from '@/data/repositories';
import { pages } from '@/pages';
const app = useNuxtApp();
const route = useRoute();
const router = useRouter();

const item = await app.$di.resolve(ApiRepository).users.getUser(route.params.id);

const onSave = async (user: UserDto) => {
  await app.$di.resolve(ApiRepository).users.updateUser(route.params.id, user);

  router.push({ name: pages.users });
};
</script>
