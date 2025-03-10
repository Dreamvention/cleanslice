import { ErrorCodes as ERROR_CODES } from '#core';

export const ErrorCodes = {
  ...ERROR_CODES,
  USER_EXISTS: 'USER_EXISTS',
  USER_NOT_CREATED: 'USER_NOT_CREATED',
  USER_NOT_CONFIRMED: 'USER_NOT_CONFIRMED',
  USER_BANNED: 'USER_BANNED',
  USER_NOT_AUTHORIZED: 'USER_NOT_AUTHORIZED',
  USER_NOT_VERIFIED: 'USER_NOT_VERIFIED',
  USER_NOT_EXISTS: 'USER_NOT_EXISTS',
};
