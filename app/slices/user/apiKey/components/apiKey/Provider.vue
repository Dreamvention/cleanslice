<script setup lang="ts">
import { ApiKeysService } from '#api';

const app = useNuxtApp();
const route = useRoute();

const { data, pending, error, refresh } = useAsyncData('apiKeys', () => ApiKeysService.getApiKeys());

const handleDelete = async (id: string) => {
  await ApiKeysService.deleteApiKey({ id });
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
    <div class="mb-4"><ApiKeyCreateThumb :loading="pending" @create="refresh" /></div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]"> Name </TableHead>
            <TableHead>Key</TableHead>
            <TableHead> Last time used </TableHead>
            <TableHead class="text-right"> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="data?.data?.length > 0" v-for="item in data?.data">
            <TableCell class="font-medium"> {{ item.name }} </TableCell>
            <TableCell>{{ item.secret }}</TableCell>
            <TableCell> {{ item.lastUsedAt }}</TableCell>
            <TableCell class="text-right">
              <NuxtLink :to="{ name: pages.apiKeysItem, params: { id: item.id } }">
                <Button size="sm" class="mr-2"><Icon name="Pencil" size="sm" /></Button>
              </NuxtLink>
              <Confirm @confirm="handleDelete(item.id)">
                <Button size="sm" variant="destructive"><Icon name="Trash" size="sm" /></Button>
              </Confirm>
            </TableCell>
          </TableRow>
          <TableRow v-else>
            <TableCell colspan="5" class="text-center text-slate-500"> No API Keys yet</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
