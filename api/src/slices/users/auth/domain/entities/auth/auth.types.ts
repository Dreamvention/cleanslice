export interface IAuthData {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface IAuth extends IAuthData {
  readonly id: number;
  readonly accessToken: string;
  readonly refreshToken: string;
  validate();
}
