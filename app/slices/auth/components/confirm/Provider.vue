<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { pages } from '../../pages';
const auth = useAuthStore();
const route = useRoute();
const email = route.query.email as string;
const countdown = ref(30);
const isButtonDisabled = ref(true);
let countdownInterval: ReturnType<typeof setInterval> | null = null;

const startCountdown = () => {
  if(!isButtonDisabled.value) {
    isButtonDisabled.value = true;
    countdown.value = 30;
  }
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownInterval!);
      isButtonDisabled.value = false;
    }
  }, 1000);
};


onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

const resendConfirm = async () => {
  startCountdown();
  const response = await auth.resendConfirm(email);
  console.log(response)
}
</script>

<template>
  <NuxtLink :to="{ name: pages.login }" class="absolute right-4 top-4 md:right-8 md:top-8">
    <Button> Sign in </Button>
  </NuxtLink>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Confirm your email</h1>
      <p class="text-sm text-muted-foreground">
        We've sent you a confirmation email. Please click the link to verify your email address.
      </p>
    </div>
    <p v-if="email" class="px-8 text-center text-sm text-muted-foreground">
      <Button :disabled="isButtonDisabled" @click="resendConfirm">Resend</Button>
      <div v-if="isButtonDisabled" class="mt-2"> (You can resend in {{ countdown }}s) </div>
    </p>
  </div>
</template>
