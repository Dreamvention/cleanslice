<script setup lang="ts">
defineProps<{ loading: boolean }>();
const emit = defineEmits<{ (e: 'submit', data: { email: string; password: string }): void }>();
const formData = ref({
  name: '',
  email: '',
  password: '',
});

const submit = () => {
  emit('submit', formData.value);
};
</script>
<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div class="grid gap-2">
      <div class="grid gap-1">
        <Label class="sr-only" for="email"> Name </Label>
        <Input
          id="name"
          placeholder="Your name"
          type="text"
          auto-capitalize="none"
          :disabled="loading"
          v-model="formData.name"
        />
      </div>
      <div class="grid gap-1">
        <Label class="sr-only" for="email"> Email </Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          :disabled="loading"
          v-model="formData.email"
        />
      </div>
      <div class="grid gap-1">
        <Label class="sr-only" for="email"> Password </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          auto-capitalize="none"
          :disabled="loading"
          v-model="formData.password"
        />
      </div>
      <Button :loading="loading" @click="submit"> Sign Up </Button>
    </div>
    <!-- <Separator title="Or continue with" />
    <Button variant="outline" type="button" :loading="isLoading">
      <Icon name="GitHubLogo" class="mr-2 h-4 w-4" />
      GitHub
    </Button> -->
  </div>
</template>
