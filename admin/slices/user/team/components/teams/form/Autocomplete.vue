<script setup lang="ts">
import isEqual from 'lodash/isEqual';
import type { AdminTeamDto, GetAdminTeamsData } from '#api';
import { TeamsService } from '#api';

const route = useRoute();
const listLoading = ref<boolean>(false);
const loading = ref(true);
const focused = ref(false);
const search = ref('');

type IPartialTeam = Pick<AdminTeamDto, 'id' | 'codename'>;
type ITeamModel = AdminTeamDto & { title: string; original: AdminTeamDto | IPartialTeam };

const props = defineProps({
  modelValue: {
    type: [Array<string>, String],
  },
  team: {
    type: [Array, Object] as PropType<AdminTeamDto | AdminTeamDto[] | IPartialTeam | IPartialTeam[]>,
  },
  additionalOptions: {
    type: Object as PropType<GetAdminTeamsData['query']>,
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
const items = ref<AdminTeamDto[]>([]);
const isOpened = ref(false);
const teams = ref<ITeamModel[] | ITeamModel | null>(props.multiple ? [] : null);
const teamsItems = computed(() =>
  items.value.map((v) => ({ ...v, title: `${v.name} (${v.user.name} - ${v.user.email})`, original: v })),
);
const emits = defineEmits(['update:modelValue', 'update:team']);
onMounted(async () => {
  loading.value = true;
  if (props.multiple) {
    if ((props.modelValue as string[])?.length) {
      teams.value = [];
      if (
        isEqual(
          (props.team as AdminTeamDto[] | undefined)?.map((p) => p.id),
          props.modelValue as string[] | undefined,
        )
      ) {
        teams.value = (props.team as AdminTeamDto[]).map((p) => ({
          ...p,
          title: `${p.name} (${p.user.name} - ${p.user.email})`,
          original: p,
        }));
      } else {
        await fetchTeams({
          ...props.additionalOptions,
          //ids: (props.modelValue as string[])?.length ? (props.modelValue as string[]) : undefined,
        });
        for (const team of items.value) {
          if ((props.modelValue as string[] | undefined)?.some((id) => team?.id === id)) {
            teams.value.push({
              ...team,
              title: `${team.name} (${team.user.name} - ${team.user.email})`,
              original: team,
            });
          }
        }
      }
    }
  } else {
    if (props.modelValue as string) {
      if (props.modelValue === (props.team as AdminTeamDto | undefined)?.id && props.team) {
        teams.value = {
          ...props.team,
          title: `${(props.team as AdminTeamDto).name} (${props.team.user.name} - ${props.team.user.email})`,
          original: props.team as AdminTeamDto,
        } as ITeamModel;
      } else {
        await fetchTeams({
          ...props.additionalOptions,
          //ids: (props.modelValue as string)?.length ? [props.modelValue as string] : undefined,
        });
        const result = items.value.find((v) => v.id === props.modelValue);

        if (result)
          teams.value = {
            ...result,
            title: `${result.name} (${result.user.name} - ${result.user.email})`,
            original: result,
          };
      }
    } else {
      await fetchTeams({
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
  () => teams.value,
  async (val, oldVal) => {
    if (props.multiple) {
      if (
        isEqual(
          (val as ITeamModel[] | undefined)?.map((p) => p.id),
          (oldVal as ITeamModel[] | undefined)?.map((p) => p.id),
        )
      ) {
        return;
      }
    } else {
      if ((val as ITeamModel | undefined)?.id === (oldVal as ITeamModel | undefined)?.id) {
        return;
      }
    }
    emits(
      'update:modelValue',
      props.multiple ? (teams.value as ITeamModel[]).map((team) => team.id) : (teams.value as ITeamModel)?.id,
    );
    emits(
      'update:team',
      props.multiple ? (teams.value as ITeamModel[]).map((b) => b?.original) : (teams.value as ITeamModel)?.original,
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
      await fetchTeams({
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

    await fetchTeams(
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
        teams.value = props.multiple ? [] : null;
      }
    }
  },
);
const clear = () => {
  search.value = '';
  teams.value = props.multiple ? [] : null;
  fetchTeams({
    ...props.additionalOptions,
    search: search.value,
  });
};

const fetchTeams = async (options?: GetAdminTeamsData['query'], getLayerItems: boolean = false) => {
  listLoading.value = true;
  let layerItems: AdminTeamDto[] = [];
  if (getLayerItems && options?.ids?.length) {
    const result = await TeamsService.getAdminTeams({
      query: {
        ...options,
        ids: undefined,
        search: undefined,
      },
    });
    if (result.data) layerItems = result.data.data ?? [];
  }

  const result = await TeamsService.getAdminTeams({
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
    v-model="teams"
    v-model:focused="focused"
    v-model:search="search"
    label="Teams"
    placeholder="Not Selected"
    :items="teamsItems.map((v) => ({ title: v.name, subtitle: `${v.user.name} - ${v.user.email}`, value: v }))"
    :loading="loading"
    :list-loading="listLoading"
    clearable
  />
</template>
