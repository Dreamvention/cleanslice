<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <UserLoginForm @submit="login" />
        <div class="mt-3">Don't have an account? <NuxtLink :to="{ name: pages.register }">Register</NuxtLink></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { pages } from '../../pages';
const auth = useAuthStore();
const router = useRouter();

const runtimeConfig = useRuntimeConfig();

console.log(runtimeConfig);

const login = async (user: { email: string; password: string }) => {
  await auth.login(user.email, user.password);

  if (auth.getAuth) {
    await router.push('/');
  }
};
</script>
