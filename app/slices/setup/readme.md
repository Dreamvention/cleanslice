# Setup

### Install CleanSlice on Nuxt

- install nuxt `npx nuxi@latest init` and name it `app`
- create folder `./slices`
- copy folder `setup` into `./slices`

create file `./registerSlices.ts`

```ts
import * as fs from 'fs';
export const registerSlices = (): string[] => {
  const slices = fs.readdirSync('./slices');
  if (!slices.length) return [];
  return slices?.filter((slice) => fs.existsSync(`./slices/${slice}`)).map((slice) => `./slices/${slice}`);
};
```

add to root `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  //...
  extends: [...registerSlices()],
});
```

### Install Pinia

- run `npm i @pinia/nuxt pinia`

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

### Install Di

- run `npm i tsyringe reflect-metadata tslib`
- run `npm i -D @rollup/plugin-typescript`

add to slice `nuxt.config.ts`

```ts
import type { Nitro } from 'nitropack';
import typescript from '@rollup/plugin-typescript';

export default defineNuxtConfig({
  hooks: {
    // Required for DI
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },
  vite: {
    // Required for DI
    plugins: [typescript()],
  },
  build: {
    // Required for DI
    transpile: ['tslib'],
  },
});
```

add to root `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "verbatimModuleSyntax": false
  }
}
```

### Install i18n

- run `npm i -D @nuxtjs/i18n@next`

- add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    // required for i18n
    vueI18n: './configs/i18n.config.ts',
    // read more https://i18n.nuxtjs.org/options/vue-i18n
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
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

create file `i18n.config.ts` in `rootDir/configs`

```ts
// import your translations here.
// you can also use localization services like https://crowdin.com/

// import enUS from "./locales/en-US";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    // en: {
    //   welcome: 'Welcome',
    // },
    // fr: {
    //   welcome: 'Bienvenue',
    // },
  },
}));
```

In every slices extend languages like so

```ts
export default defineNuxtConfig({
  //https://i18n.nuxtjs.org/guide/layers#merging-locales
  modules: ['@nuxtjs/i18n'],
  i18n: {
    langDir: './locales',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'fr', file: 'fr.json' },
    ],
  },
});
```
