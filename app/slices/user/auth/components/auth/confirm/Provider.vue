<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from '#theme/components/ui/toast/use-toast';
import { AuthService } from '#api/data';
import { Label } from '#theme/components/ui/label';
import { Input } from '#theme/components/ui/input';
import { Loader } from 'lucide-vue-next';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const email = route.query.email as string;
const countdown = ref(30);
const isButtonDisabled = ref(true);
const confirmationCode = ref('');
const isConfirming = ref(false);
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
  console.log(response);
};

const confirmByCode = async () => {
  try {
    isConfirming.value = true;
    await AuthService.confirm({
      query: {
        code: confirmationCode.value,
        username: email,
        redirectUrl: '/'
      }
    });
    toast({
      title: "Success",
      description: "Email confirmed successfully. You can now sign in.",
    });
    router.push({ name: pages.login });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to confirm email. Please try again.",
    });
  } finally {
    isConfirming.value = false;
  }
};
</script>

<template>
  <NuxtLink :to="{ name: pages.login }" class="absolute right-4 top-4 md:right-8 md:top-8">
    <Button> Sign in </Button>
  </NuxtLink>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">Confirm your email</h1>
      <p class="text-sm text-muted-foreground">
        We've sent you a confirmation code. Please enter it below to verify your email address.
      </p>
    </div>
    <div class="grid gap-2">
      <div class="grid gap-1">
        <Input
          id="code"
          v-model="confirmationCode"
          placeholder="Enter your confirmation code"
          type="text"
          autocomplete="one-time-code"
        />
      </div>
      <Button :disabled="isConfirming" @click="confirmByCode">
        <Loader v-if="isConfirming" class="mr-2 h-4 w-4 animate-spin" />
        Confirm Email
      </Button>
    </div>
    <p v-if="email" class="px-8 text-center text-sm text-muted-foreground">
      <Button :disabled="isButtonDisabled" @click="resendConfirm">Resend Code</Button>
      <div v-if="isButtonDisabled" class="mt-2"> (You can resend in {{ countdown }}s) </div>
    </p>
  </div>
</template>
