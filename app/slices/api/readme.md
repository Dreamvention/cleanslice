# Api

Dependencies:

- setup
- account (for authentication)
- https://heyapi.vercel.app/

### Install Cookie (for Authentication)

run `npm i js-cookie`
run `npm i --save-dev @types/js-cookie`

Api uses Cookies to store the API_TOKEN. once you provide a a cookie with a token, the API will be authenticated. To logout, simply delete the cookie. Use the `utils` method `handleApiAuthentication` for authentication.

### Install Axios

run `npm i -D axios axios-retry form-data@4.x`

read more https://github.com/ferdikoomen/openapi-typescript-codegen/blob/master/docs/axios-support.md

### Install CodeGen

Be sure to read this article on NEST js @API https://docs.nestjs.com/openapi/operations
Run in terminal

run `npm i -D @hey-api/openapi-ts`

Add to `package.json`

```json
{
  "scripts": {
    "build:api": "openapi-ts",
    "dev": "npm run build:api && nuxt dev"
  }
}
```

Add file to root `./openapi-ts.config.ts`

```ts
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: 'axios',
  name: 'ApiClient',
  format: 'prettier',
  input: '../api/swagger-spec.json',
  output: './slices/api/data/repositories/api',
  types: {
    enums: 'javascript',
  },
});
```

Add file `./data/repositories/api/api.repository.ts`

```ts
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { injectable, inject } from 'tsyringe';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ApiAxios } from '../../../apiAxios';
import { ApiClient } from './ApiClient';
import Cookies from 'js-cookie';

@injectable()
export class ApiRepository extends ApiClient {
  constructor(@inject('apiConfig') config: Partial<OpenAPIConfig>) {
    //Authenticate API by providing a cookie with API_TOKEN
    config.TOKEN = Cookies.get(process.env.API_TOKEN ?? 'API_TOKEN');
    super(config, ApiAxios);
  }
}
```

Add file `./data/repositories/index.ts`

```ts
export * from './api/api.repository';
```

Create file `api.config.ts` in `rootDir/configs`

```ts
export const apiConfig = {
  BASE: process.env.API_URL ?? 'http://localhost:3333',
  VERSION: '1.0',
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
```

Create file `.env` and add

```bash
#API slice vars
API_URL=http://localhost:3333
```

### How to use API in slices

In other slices to use `@/api` copy the following 2 files

```ts
export { ApiRepository } from '@/api';
```
