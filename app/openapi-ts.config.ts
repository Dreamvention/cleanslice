import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: 'legacy/axios',
  name: 'ApiClient',
  input:
    '../api/swagger-spec.json',
  output: {
    format: 'prettier',
    path: './slices/api/data/repositories/api'
  },
  types: {
    enums: 'javascript',
  },
});
