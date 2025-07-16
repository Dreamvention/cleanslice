<script lang="ts" setup>
defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <PageTitle title="Team" subtitle="Manage team." />
  <Tabs default-value="teamInfo" class="max-w-2xl">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="teamInfo">
        Team Info
      </TabsTrigger>
      <TabsTrigger value="teamUsers">
        Team Users
      </TabsTrigger>
    </TabsList>
    <TabsContent value="teamInfo" class="max-w-2xl mx-auto">
      <TeamsUpdateInfo :loading="loading" />
    </TabsContent>
    <TabsContent value="teamUsers">
      <TeamsUpdateUsersProvider :loading="loading" class="w-[100%]" />
    </TabsContent>
  </Tabs>
</template>
