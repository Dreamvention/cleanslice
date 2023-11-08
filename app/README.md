# App CleanSlice (NUXT)

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Core philosophy

- Screaming architecture
- Abstract when necessary
- Write reusable code
- Test more, debug less

## Install CleanSlice on Nuxt

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

## Slices

- [Setup](./slices/setup/readme.md)
- [Api](./slices/api/readme.md)
- [Theme](./slices/theme/readme.md)
- [Capacitor](./slices/capacitor/readme.md)
- [Common](./slices/common/readme.md)
- [Users with APi](./slices/users/readme.md)
- [Users with Gateway](./slices/users-gateway/readme.md)
- [Users with Service](./slices/users-service/readme.md)

## Theory

There are three examples of structuring your app slice code.

1. Repository (simple)
2. Gateway
3. Service

### Simple

The Repository (simple) architecture pattern demonstrates how you can fetch data using only the `ApiRepository`. You can rely on the repository DTOs and use them as interfaces for your components. You don't need to create extra abstractions with Entities, Gateways, Mappers and Services.

Use this pattern when you are prototyping and can rely on the `ApiRepository` because you are also responsible for developing the backend.

### Gateway

The Gateway architecture pattern demonstrates how you should implement the basic Clean Architecture pattern with Entities and Gateway Interfaces in the Domain and Gateways and Mappers in the Data layers. You are not required to create extra abstraction with Services.

Use this pattern when you are implementing Business logic inside the Domain and require Entities. You can choose to skip creating Services, if you plan only to fetch Data through your Gateways. You will also have to implement this pattern if you need FilterOptions.

### Service

The Service architecture pattern demonstrates how you should implement the full Clean Architecture pattern with a complete Domain layer and Data layer. You Services will live in you Domain folder. You are required to implement all of the layers accordingly.

Use this pattern when you are implementing Application logic inside the Domain and require Services. You can add application specific logic into your Services (aka Use Cases) and use them throughout your UI layer.

### How to start

Start by implementing the simple pattern if you are also developing the API. You can rapidly prototype your application without having to write lots of abstractions.

Later on, when you learn the details of your Business and Application logic, you can refactor your Slices to fit either the Gateway or Service pattern.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
