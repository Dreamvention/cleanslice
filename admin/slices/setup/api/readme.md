# API Setup

This slice provides API integration capabilities for the application using OpenAPI/Swagger specifications.

## Dependencies

- `setup` slice
- `users/auth` slice (for authentication)
- [HeyAPI](https://heyapi.vercel.app/) for API client generation

## Required Packages

### Authentication

```bash
npm i js-cookie
npm i --save-dev @types/js-cookie
```

### HTTP Client

```bash
npm i -D axios axios-retry form-data@4.x
```

### API Client Generation

```bash
npm i -D @hey-api/openapi-ts
```

## Configuration

### Environment Variables

Add to your `.env` file:

```bash
API_URL=http://localhost:3333
```

### API Client Configuration

The API client is configured in `api.config.ts` with the following settings:

- Base URL from environment variables
- Authentication via cookies
- Axios as the HTTP client

### OpenAPI Configuration

Create `openapi-ts.config.ts` in the root directory:

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

Add to `package.json`:

```json
{
  "scripts": {
    "build:api": "openapi-ts",
    "dev": "npm run build:api && nuxt dev"
  }
}
```

## Authentication

The API uses cookies for authentication:

- API token is stored in a cookie named by `API_TOKEN` environment variable (defaults to 'API_TOKEN')
- Use `handleApiAuthentication` utility method for authentication
- To logout, simply delete the cookie

## Usage in Other Slices

To use the API in other slices:

1. Import the API repository:

```ts
export { ApiRepository } from '@/api';
```

2. Use dependency injection to access the API client:

```ts
@injectable()
export class YourService {
  constructor(@inject('ApiRepository') private api: ApiRepository) {}

  async someMethod() {
    // Use api client methods here
  }
}
```

## Project Structure

```
api/
├── data/               # Generated API client code
│   └── repositories/   # API repository implementations
├── utils/             # Utility functions
├── api.config.ts      # API client configuration
├── index.ts           # Public exports
└── readme.md          # This documentation
```

## Additional Resources

- [NestJS OpenAPI Documentation](https://docs.nestjs.com/openapi/operations)
- [Axios Support Documentation](https://github.com/ferdikoomen/openapi-typescript-codegen/blob/master/docs/axios-support.md)
