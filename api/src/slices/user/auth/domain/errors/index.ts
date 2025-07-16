export * from './userExists.error';
export * from './userNotCreated.error';
export * from './userNotConfirmed.error';
export * from './userNotAuthorized.error';
export * from './userBanned.error';
export * from './userNotVerified.error';
export * from './userNotExists.error';

export class UserAlreadyVerifiedError extends Error {
  constructor(message = 'User is already verified') {
    super(message);
    this.name = 'UserAlreadyVerifiedError';
  }
}

export const UsersErrors = {
  UserAlreadyVerifiedError,
};
