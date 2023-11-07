# Theme

### Install SCSS

run `npm i -D sass sass-loader`

add to your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  css: ['@/slices/vuetify/assets/scss/main.scss'],
});
```

### Vuetify

run `npm i -D @invictus.codes/nuxt-vuetify`

copy `./nuxt.config.ts` into `rootDir/configs`

add to your `nuxt.config.ts`

```ts
import vuetifyOptions from '../../configs/vuetify.config';
export default defineNuxtConfig({
  modules: ['@invictus.codes/nuxt-vuetify'],
  //...
  vuetify: {
    vuetifyOptions,
    moduleOptions: {
      /* vite-plugin-vuetify options */
      autoImport: true,
      // Read more https://www.npmjs.com/package/webpack-plugin-vuetify
      // styles: { configFile: '~/slices/vuetify/assets/scss/vuetify.scss' },
    },
  },
});
```

replace in `app.vue`

```tsx
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```
