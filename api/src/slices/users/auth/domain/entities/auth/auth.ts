import { IAuth, IAuthData } from './auth.types';

export class Auth implements IAuth {
  readonly id: number;
  readonly accessToken: string;
  readonly refreshToken: string;

  constructor(data: IAuthData) {
    Object.assign(this, data);
  }

  validate() {
    throw new Error('Method not implemented.');
  }
}
