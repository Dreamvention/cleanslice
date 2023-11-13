<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props"> <v-icon>mdi-translate</v-icon> </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in localeCodes"
        :key="index"
        :value="item"
        :active="locale == item"
        @click="(locale = item), setLocaleCookie(locale)"
      >
        <v-list-item-title>{{ $t(`locale.${item}`) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
// Read more https://i18n.nuxtjs.org/api/composables#usebrowserlocale
const { locale, setLocaleCookie, localeCodes } = useI18n();
</script>
