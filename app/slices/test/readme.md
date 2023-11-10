# Test

### Install Vitest

Run in terminal

```bash
npm i -D @nuxt/test-utils @vue/test-utils @vitejs/plugin-vue @vitest/ui resize-observer-polyfill jsdom vitest
npm i -D  msw
```

Add to root `package.json`

```json
    "test": "vitest --config ./configs/vitest.config.ts",
    "test:ui": "vitest --ui --config ./configs/vitest.config.ts",
    "test:coverage": "vitest run --coverage --config ./configs/vitest.config.ts"
```
