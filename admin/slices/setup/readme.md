# Setup

### Install Pinia

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

### Install Di

run in terminal

```bash
npm i tsyringe reflect-metadata tslib nitropack`
npm i -D @rollup/plugin-typescript
```

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

run in terminal

```bash
npm i -D @nuxtjs/i18n@next
```

add to slice `nuxt.config.ts`

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

add to root `tsconfig.json`

```json
{
  "compilerOptions": {
    "allowJs": false
  }
}
```

create file `i18n.config.ts` in `root/configs`

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

### How to use i18n in slices

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

### How to localize dates

Setup formats:

Create file `i18n.config.ts` in `root/configs` add

```ts
export default defineI18nConfig(() => ({
  //...
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
      time: {
        hour: '2-digit',
        minute: 'numeric',
        hour12: true,
      },
    },
    fr: {
      //...
    }
})
```

In your components use `$d`

```html
<div>{{ $d(new Date(item.createdAt), 'short') }}</div>
```

or

```html
<i18n-d tag="span" :value="new Date(item.createdAt)" format="long"></i18n-d>
```

or

Create file `.slices/common/utils/formatDate.ts` to use this method in any part of the app

```ts
export const formatDate = (date: string) => {
  const { d } = useI18n();
  return d(new Date(date), 'short');
};
```
