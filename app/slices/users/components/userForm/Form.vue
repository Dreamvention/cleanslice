<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="user.name" label="Name" :rules="nameRules" required density="compact"></v-text-field>

    <v-text-field v-model="user.email" label="Email" :rules="emailRules" required density="compact"></v-text-field>

    <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
    <v-btn @click="reset" color="primary">Reset</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { UserDto } from '@/data/repositories/api';
import { ref } from 'vue';
const props = defineProps({
  item: {
    type: Object as PropType<UserDto>,
    required: true,
  },
});

const valid = ref(false);
const user = ref(props.item);

const nameRules = [
  (v) => !!v || 'Name is required',
  (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
];
const emailRules = [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'];

const submit = () => {
  // Here you would typically make an API call to submit your form data
  alert('Form submitted!');
};

const reset = () => {
  user.value = {
    id: 0,
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
  };
  valid.value = false;
};
</script>
