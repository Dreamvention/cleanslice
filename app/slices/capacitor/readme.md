# Capacitor

Dependencies

- Xcode (MAC OS)
- Android Studio

### Install Capacitor

run in terminal

```bash
npm i -D @capacitor/cli
cd slices/capacitor
npm i
```

add to root `package.json`

```json
{
  "scripts": {
    "capacitor-update": "npm run generate && sh ./slices/capacitor/build.sh",
    "build:ios": "npm run capacitor-update && cd slices/capacitor  && npx cap sync &&  npx cap open ios",
    "build:android": "npm run capacitor-update && cd slices/capacitor  && npx cap sync && npx cap open android"
  }
}
```

add to slice `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  ssr: false,
});
```
