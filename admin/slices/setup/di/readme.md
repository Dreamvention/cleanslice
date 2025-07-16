# Di

### Install

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
