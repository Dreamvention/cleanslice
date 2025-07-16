<script setup lang="ts">
import { UsersService, UpdateUserDto, UserDto } from '#api/data';

const props = defineProps({
  modelValue: {
    type: String,
  },
  noDataText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const listLoading = ref(false);
const loading = ref(true);
const isOpened = ref(false);
const search = ref('');
const items = ref<UserDto[]>([]);

const fieldValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const fetchUsers = async (searchValue: string) => {
  listLoading.value = true;
  try {
    const result = await UsersService.getUsers({
      query: {
        search: searchValue,
      },
    });

    items.value = result.data?.data ?? [];
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    listLoading.value = false;
  }
};

watch(
  () => search.value,
  async (val: string, oldVal: string) => {
    if (val === oldVal) {
      return;
    }
    if (isOpened.value && val !== '') {
      await fetchUsers(val);
    }
  },
);

onMounted(async () => {
  await fetchUsers(search.value);
  loading.value = false;
});
</script>

<template>
  <Autocomplete
    v-model="fieldValue"
    v-model:search="search"
    v-model:menu="isOpened"
    :loading="loading"
    :list-loading="listLoading"
    :no-data-text="noDataText"
    clearable
    type="email"
    placeholder="Enter user email"
    :items="items.map((v) => ({ title: v.email, value: v.email }))"
    autocomplete="off"
  />
</template>
