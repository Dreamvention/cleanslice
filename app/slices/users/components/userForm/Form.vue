<template>
  <CommonHeading>Create User</CommonHeading>

  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="user.name"
      label="Name"
      :rules="rules.name"
      required
      variant="outlined"
      class="ma-1"
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      label="Email"
      :rules="rules.email"
      required
      variant="outlined"
      class="ma-1"
    ></v-text-field>

    <v-btn :disabled="!valid" @click="submit" class="ma-1">Submit</v-btn>
    <v-btn @click="reset" color="primary" class="ma-1">Reset</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { UserDto } from '@/data/repositories';
import { ref } from 'vue';
const props = defineProps({
  item: {
    type: Object as PropType<UserDto>,
    required: true,
  },
});

const emit = defineEmits<{ (e: 'save', data: UserDto): void }>();
const valid = ref(false);
const user = ref<UserDto>(props.item);

const rules = useUserRules();

const submit = () => {
  emit('save', user.value);
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
