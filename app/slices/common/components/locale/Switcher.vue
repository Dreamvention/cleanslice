<template>
  <v-select v-model="locale" :items="items" label="Select" />
</template>

<script lang="ts" setup>
const { locale } = useI18n();

const items = ['en', 'fr'];
</script>
```
