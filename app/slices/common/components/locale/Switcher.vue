<template>
  <v-select v-model="locale" :items="localeCodes" label="Select" @update:model-value="setLocaleCookie(locale)" />
</template>

<script lang="ts" setup>
// Read more https://i18n.nuxtjs.org/api/composables#usebrowserlocale
const { locale, setLocaleCookie, localeCodes } = useI18n();
</script>
