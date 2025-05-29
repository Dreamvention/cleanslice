<template>
  <div>
    <h1>Team</h1>
  </div>
  <TeamItemProvider />
</template>

<script lang="ts" setup>
definePageMeta({
  name: 'teams-item',
  layout: 'teams',
  public: false,
});
</script>
