export interface IAuthData {
  id: string;
  teamId?: string;
  accessToken: string;
  refreshToken: string;
}

export interface ICreateAuthData {
  email: string;
  password: string;
  deviceId: string;
}
