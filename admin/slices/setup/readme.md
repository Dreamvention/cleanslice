# APP Core for Nuxt

### Install SCSS

run `npm i -D sass sass-loader`

create file `./assets/scss/main.scss`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  css: ["~/assets/scss/main.scss"],
});
```

### Vuetify

run `npm i -D @invictus.codes/nuxt-vuetify`

create file `./assets/scss/vuetify.scss`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@invictus.codes/nuxt-vuetify"],
  //...
  vuetify: {
    moduleOptions: {
      /* vite-plugin-vuetify options */
      autoImport: true,
      styles: { configFile: "~/assets/scss/vuetify.scss" },
    },
  },
});
```

### Pinia

run `npm i @pinia/nuxt pinia`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  //...
  imports: {
    dirs: ["stores", "slices/*/stores"],
  },
});
```

### Di

run `npm i tsyringe reflect-metadata`

add to `nuxt.config.ts`

```ts
import type { Nitro } from "nitropack";
import typescript from "@rollup/plugin-typescript";

export default defineNuxtConfig({
  hooks: {
    "nitro:build:before": (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push("reflect-metadata");
    },
  },
  //...
  vite: {
    plugins: [typescript()],
  },
});
```

add to `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
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
    "dev": "npm run build:api && nuxt dev",
    "build:api": "openapi --input ../api/swagger-spec.json --output ./data/repositories/api --name ApiRepository --client axios "
  }
}
```

### Axios

run `npm i -D axios`

### utils

run `npm i -D tslib`

### i18n

run `npm i -D @nuxtjs/i18n@next`

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n"],
  i18n: {
    /* module options */
  },
});
```

add to `tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```
