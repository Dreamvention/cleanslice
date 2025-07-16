# Pinia

### Install

run in terminal

```bash
npm i @pinia/nuxt pinia
```

add to slice `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  //...
  imports: {
    // Required for pinia
    dirs: ['stores', 'slices/*/stores'],
  },
});
```
