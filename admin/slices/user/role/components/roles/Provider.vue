<script setup lang="ts">
import { pages } from '../../pages';
import { RolesService } from '#api';

const route = useRoute();
const { data, pending, refresh } = useAsyncData('roles', () => RolesService.getRoles());

const handleDelete = async (id: string) => {
  await RolesService.deleteRole({
    path: {
      id
    }
  });
  refresh();
};

watch(
  () => route.params,
  () => {
    refresh();
  },
);
</script>

<template>
  <div class="w-full">
    <div class="mb-4">
      <RolesCreateThumb :loading="pending" @create="refresh" />
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Name </TableHead>
            <TableHead> Permissions </TableHead>
            <TableHead class="text-right"> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="data?.data?.data && data?.data?.data.length > 0" v-for="item in data?.data?.data">
            <TableCell>{{ item.name }}</TableCell>
            <TableCell class="flex flex-wrap gap-2">
              <template v-if="item.permissions.length > 0">
                <span v-for="permission in item.permissions.slice(0, 10)" :key="permission"
                  class="bg-muted px-2 py-1 rounded-md">
                  {{ permission }}
                </span>
                <span v-if="item.permissions.length > 10" class="bg-muted px-2 py-1 rounded-md mx-1">
                  and {{ item.permissions.length - 10 }} more
                </span>
              </template>
            </TableCell>
            <TableCell class="text-right min-w-[120px]">
              <NuxtLink :to="{ name: pages.rolesItem, params: { id: item.id } }">
                <Button size="sm" class="mr-2">
                  <Icon name="Pencil" size="sm" />
                </Button>
              </NuxtLink>
              <Confirm @confirm="handleDelete(item.id)">
                <Button size="sm" variant="destructive">
                  <Icon name="Trash" size="sm" />
                </Button>
              </Confirm>
            </TableCell>
          </TableRow>
          <TableRow v-else>
            <TableCell colspan="5" class="text-center "> No Users yet</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
