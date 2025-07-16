<script setup lang="ts">
import isEqual from 'lodash/isEqual';
import type { UserDto, GetUsersData, GetUserData } from '#api';
import { UsersService } from '#api';

const route = useRoute();
const listLoading = ref<boolean>(false);
const loading = ref(true);
const focused = ref(false);
const search = ref('');

type IPartialUser = Pick<UserDto, 'id' | 'name'>;
type IUserModel = UserDto & { title: string; original: UserDto | IPartialUser };

const props = defineProps({
  modelValue: {
    type: [Array<string>, String],
  },
  user: {
    type: [Array, Object] as PropType<UserDto | UserDto[] | IPartialUser | IPartialUser[]>,
  },
  additionalOptions: {
    type: Object as PropType<GetUsersData['query']>,
    default: () => ({}),
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  clearAfterSelect: {
    type: Boolean,
    default: false,
  },
});
const items = ref<UserDto[]>([]);
const isOpened = ref(false);
const users = ref<IUserModel[] | IUserModel | null>(props.multiple ? [] : null);
const usersItems = computed(() => items.value.map((v) => ({ ...v, title: v.name, original: v })));
const emits = defineEmits(['update:modelValue', 'update:user']);
onMounted(async () => {
  loading.value = true;
  if (props.multiple) {
    if ((props.modelValue as string[])?.length) {
      users.value = [];
      if (
        isEqual(
          (props.user as UserDto[] | undefined)?.map((p) => p.id),
          props.modelValue as string[] | undefined,
        )
      ) {
        users.value = (props.user as UserDto[]).map((p) => ({
          ...p,
          title: p.name,
          original: p,
        }));
      } else {
        await fetchUsers({
          ...props.additionalOptions,
          //ids: (props.modelValue as string[])?.length ? (props.modelValue as string[]) : undefined,
        });
        for (const user of items.value) {
          if ((props.modelValue as string[] | undefined)?.some((id) => user?.id === id)) {
            users.value.push({
              ...user,
              title: user.name,
              original: user,
            });
          }
        }
      }
    }
  } else {
    if (props.modelValue as string) {
      if (props.modelValue === (props.user as UserDto | undefined)?.id && props.user) {
        users.value = {
          ...props.user,
          title: (props.user as UserDto).name,
          original: props.user as UserDto,
        } as IUserModel;
      } else {
        await fetchUsers({
          ...props.additionalOptions,
          //ids: (props.modelValue as string)?.length ? [props.modelValue as string] : undefined,
        });
        const result = items.value.find((v) => v.id === props.modelValue);

        if (result) users.value = { ...result, title: result.name, original: result };
      }
    } else {
      await fetchUsers({
        ...props.additionalOptions,
        perPage: Number(5),
      });
    }
  }
  loading.value = false;
});

watch(
  () => props.additionalOptions,
  (val, oldVal) => {
    if (!isEqual(val, oldVal)) {
      clear();
    }
  },
  { deep: true },
);

watch(
  () => users.value,
  async (val, oldVal) => {
    if (props.multiple) {
      if (
        isEqual(
          (val as IUserModel[] | undefined)?.map((p) => p.id),
          (oldVal as IUserModel[] | undefined)?.map((p) => p.id),
        )
      ) {
        return;
      }
    } else {
      if ((val as IUserModel | undefined)?.id === (oldVal as IUserModel | undefined)?.id) {
        return;
      }
    }
    emits(
      'update:modelValue',
      props.multiple
        ? (users.value as IUserModel[]).map((user) => user.id)
        : (users.value as IUserModel)?.id,
    );
    emits(
      'update:user',
      props.multiple
        ? (users.value as IUserModel[]).map((b) => b?.original)
        : (users.value as IUserModel)?.original,
    );
    if (props.clearAfterSelect) {
      clear();
    }
  },
  { deep: true },
);

watch(
  () => search.value,
  async (val: string, oldVal: string) => {
    if (val === oldVal) {
      return;
    }
    if (!focused.value && isOpened.value && val !== '') {
      await fetchUsers({
        ...props.additionalOptions,
        search: val,
      });
    }
  },
);
watch(
  () => focused.value,
  async (val: boolean, oldVal: boolean) => {
    if (!val) {
      return;
    }
    if (val === oldVal) {
      return;
    }

    await fetchUsers(
      {
        ...props.additionalOptions,
        search: search.value,
      },
      true,
    );
    focused.value = false;
  },
);

watch(
  () => props.modelValue,
  (val, oldVal) => {
    if (val !== oldVal) {
      if (!val) {
        search.value = '';
        users.value = props.multiple ? [] : null;
      }
    }
  },
);
const clear = () => {
  search.value = '';
  users.value = props.multiple ? [] : null;
  fetchUsers({
    ...props.additionalOptions,
    search: search.value,
  });
};

const fetchUsers = async (options?: GetUsersData['query'], getLayerItems: boolean = false) => {
  listLoading.value = true;
  let layerItems: UserDto[] = [];
  if (getLayerItems && options?.ids?.length) {
    const result = await UsersService.getUsers({
      query: {
        ...options,
        ids: undefined,
        search: undefined,
      },
    });
    if (result.data) layerItems = result.data.data ?? [];
  }
  const result = await UsersService.getUsers({
    query: {
      ...options,
    },
  });
  if (result) {
    items.value = result.data?.data ?? [];
  }
  items.value = [...items.value, ...layerItems];
  items.value = items.value.filter((item, index, arr) => arr.map((arrItem) => arrItem.id).indexOf(item.id) === index);
  listLoading.value = false;
};
</script>

<template>
  <Autocomplete
    v-bind="$attrs"
    v-model:menu="isOpened"
    v-model="users"
    v-model:focused="focused"
    v-model:search="search"
    label="Users"
    placeholder="Not Selected"
    :items="usersItems.map((v) => ({ title: v.name, value: v }))"
    :loading="loading"
    :list-loading="listLoading"
    clearable
  />
</template>
