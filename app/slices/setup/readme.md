# APP Core for Nuxt

install nuxt `npx nuxi@latest init` and name it `app`
create folder `./slices`
copy folder `setup` into `./slices`
create file `./registerSlices.ts`

```ts
import * as fs from 'fs';
export const registerSlices = (): string[] => {
  const slices = fs.readdirSync('./slices');
  if (!slices.length) return [];
  return slices?.filter((slice) => fs.existsSync(`./slices/${slice}`)).map((slice) => `./slices/${slice}`);
};
```

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  //...
  extends: [...registerSlices()],
});
```

### Install SCSS

run `npm i -D sass sass-loader`

create file `./assets/scss/main.scss`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss'],
});
```

### Vuetify

run `npm i -D @invictus.codes/nuxt-vuetify`

create file `./assets/scss/vuetify.scss`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@invictus.codes/nuxt-vuetify'],
  //...
  vuetify: {
    moduleOptions: {
      /* vite-plugin-vuetify options */
      autoImport: true,
      // Read more https://www.npmjs.com/package/webpack-plugin-vuetify
      // styles: { configFile: '~/assets/scss/vuetify.scss' },
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

### Pinia

run `npm i @pinia/nuxt pinia`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  //...
  imports: {
    dirs: ['stores', 'slices/*/stores'],
  },
});
```

### Di

run `npm i tsyringe reflect-metadata tslib`
run `npm i -D @rollup/plugin-typescript`

add to `nuxt.config.ts`

```ts
import type { Nitro } from 'nitropack';
import typescript from '@rollup/plugin-typescript';

export default defineNuxtConfig({
  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },
  //...
  vite: {
    plugins: [typescript()],
  },
  build: {
    // Required for DI
    transpile: ['tslib'],
  },
});
```

add to `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "verbatimModuleSyntax": false
  }
}
```

### CodeGen

run `npm i -D openapi-typescript-codegen`

add to `package.json`

```json
{
  "scripts": {
    //...
    "build:api": "openapi --input ../api/swagger-spec.json --output ./data/repositories/api --name ApiClient --client axios ",
    "dev": "npm run build:api && nuxt dev"
  }
}
```

add file `./data/repositories/api/api.repository.ts`

```ts
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { injectable, inject } from 'tsyringe';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ApiAxios } from '@/slices/setup/apiAxios';
import { ApiClient } from './ApiClient';

@injectable()
export class ApiRepository extends ApiClient {
  constructor(@inject('apiConfig') config: Partial<OpenAPIConfig>) {
    super(config, ApiAxios);
  }
}
```

add file `./data/repositories/index.ts`

```ts
export * from './api/api.repository';
```

### Axios

run `npm i -D axios axios-retry`

### i18n

run `npm i -D @nuxtjs/i18n@next`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    /* module options */
  },
});
```

add to `tsconfig.json`

```json
{
  "compilerOptions": {
    "allowJs": false
  }
}
```

create file `i18n.config.ts`

```ts
// import your translations here.
// you can also use localization services like https://crowdin.com/

// import enUS from "./locales/en-US";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
    },
    fr: {
      welcome: 'Bienvenue',
    },
  },
}));
```
