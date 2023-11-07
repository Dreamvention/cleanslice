# Capacitor

run `npm i -D @capacitor/cli`

run `cd slices/capacitor`

run `npm i`

add to `package.json`

```json
{
  "scripts": {
    //...
    "capacitor-update": "npm run generate && sh ./slices/capacitor/build.sh",
    "build:ios": "npm run capacitor-update && cd slices/capacitor  && npx cap sync &&  npx cap open ios",
    "build:android": "npm run capacitor-update && cd slices/capacitor  && npx cap sync && npx cap open android"
  }
}
```

add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  ssr: false,
});
```
