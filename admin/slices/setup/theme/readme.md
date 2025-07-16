# Theme

### Install shadcn

run `npm install -D @nuxtjs/tailwindcss shadcn-nuxt`
run `npm install vee-validate @vee-validate/zod zod`
run `npm install vaul-vue`

- use `cli`
  copy `./components.json` into root of app for `npx shadcn-vue@latest add` to work
  or run `npx shadcn-vue@latest init`

### Install SCSS

Run in terminal

```bash
npm i -D sass sass-loader
```

Add to slice `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  css: ['#theme/assets/scss/main.scss'],
});
```

### Nuxt layout

replace in root `app.vue`

```tsx
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### Install a component via CLI

- https://www.shadcn-vue.com/docs/cli.html

run in root

```bash
npx shadcn-vue@latest add [COMPONENT]
```

### Install icons

run `npm install lucide-vue-next`

### Install fonts

run `npm i webfontloader`
run `npm i -D @types/webfontloader`
