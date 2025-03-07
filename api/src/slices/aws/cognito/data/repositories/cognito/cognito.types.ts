import {
  AdminConfirmSignUpCommandOutput,
  AuthenticationResultType,
  ConfirmSignUpCommandOutput,
  SignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

export interface ICognito {
  refreshToken(refreshToken: string): Promise<AuthenticationResultType | undefined>;
  registerUser(registerRequest: IRegisterRequest): Promise<SignUpCommandOutput>;
  authenticateUser(user: IAuthRequest): Promise<AuthenticationResultType | undefined>;
  confirmSignUp(username: string): Promise<AdminConfirmSignUpCommandOutput | undefined>;
  confirmSignUpByCode(username: string, confirmationCode: string): Promise<ConfirmSignUpCommandOutput>;
  restorePassword(Username: string): Promise<string>;
  confirmRestorePassword(username: string, confirmationCode: string, password: string): Promise<void>;
  addUserToGroup(username: string, groupName: string): Promise<void>;
  changePassword(token: string, previousPassword: string, newPassword: string): Promise<void>;
}

export interface IRegisterRequest {
  name: string;
  email?: string;
  phone_number?: string;
  password: string;
}
export interface IAuthRequest {
  name: string;
  password: string;
}
