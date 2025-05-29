import { IAuthData, ICreateAuthData } from './auth.types';
import { IUserData, ICreateUserData } from '#users/users';

export abstract class IAuthGateway {
  abstract login(email: string, password: string): Promise<IAuthData>;
  abstract register(data: ICreateAuthData & ICreateUserData): Promise<IUserData>;
  abstract refreshToken(refreshToken: string): Promise<IAuthData>;
  abstract confirm(name: string, code: string): Promise<void>;
  abstract resendConfirm(name: string): Promise<void>;
  abstract createTokens(user: IUserData): Promise<IAuthData>;
  abstract verifyToken(token: string): Promise<{ id: string; email: string }>;
}
