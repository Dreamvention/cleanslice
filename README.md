# Setup APP

- install nuxt `npx nuxi@latest init` and name it `app`
- install pinia `npm install pinia @pinia/nuxt`

```ts
// nuxt.config.js
export default defineNuxtConfig({
  // ... other options
  modules: [
    // ...
    "@pinia/nuxt",
  ],
});
```

- install vuetify `npm install --save-dev @invictus.codes/nuxt-vuetify`

```ts
export default defineNuxtConfig({
  modules: ["@invictus.codes/nuxt-vuetify"],
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true | false,
      useIconCDN: true | false,
      /* vite-plugin-vuetify options */
      styles: true | "none" | "expose" | "sass" | { configFile: string },
      autoImport: true | false,
      useVuetifyLabs: true | false,
    },
  },
});
```

- install scss `npm install sass`

```ts
export default defineNuxtConfig({
  //...
  css: ["~/assets/scss/main.scss"],
  vite: {
    //...
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;',
        },
      },
    },
  },
});
```

- run `nest new api`
- run `npm install --save @nestjs/swagger`
- create folder `core` in root

# Setup API

# Setup Prisma (Database)

# File structure

# Beaufactor

- Do:

```js
const [password, salt] = user.password.split(".");
```

- Don't:

```js
const parts = user.password.split(".");
password = parts[0];
salt = parts[1];
```
