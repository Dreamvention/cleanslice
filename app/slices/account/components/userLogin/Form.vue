import loginVue from '~/pages/login.vue';
<template>
  <v-card>
    <v-card-title class="headline">User Login</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Email" required v-model="formData.email"></v-text-field>
        <v-text-field label="Password" type="password" required v-model="formData.password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ (e: 'submit', data: { email: string; password: string }): void }>();

const formData = ref({
  email: '',
  password: '',
});

const submit = () => {
  emit('submit', formData.value);
};
</script>
