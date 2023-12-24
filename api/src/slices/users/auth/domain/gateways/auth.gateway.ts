import { IAuthData } from '../entities';
import { IUserData } from '../../../users/domain';

export abstract class IAuthGateway {
  abstract login(email: string, password: string): Promise<IAuthData>;
  abstract register(data: IUserData): Promise<IAuthData>;
  abstract refreshToken(refreshToken: string): Promise<IAuthData>;
}
