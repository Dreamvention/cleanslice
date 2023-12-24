// default api.config.ts
// place it in rootDir/configs

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
