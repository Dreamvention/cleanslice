# Theme

### Install SCSS

Run in terminal

```bash
npm i -D sass sass-loader
```

Add to slice `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  css: ['@/slices/vuetify/assets/scss/main.scss'],
});
```

### Install Vuetify

Run in terminal

```bash
npm i -D @invictus.codes/nuxt-vuetify
```

Copy `./nuxt.config.ts` into `root/configs`

Add to slice `nuxt.config.ts`

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

replace in root `app.vue`

```tsx
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```
