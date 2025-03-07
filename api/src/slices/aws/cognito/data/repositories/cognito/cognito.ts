import { Injectable } from '@nestjs/common';
import { IAuthRequest, ICognito, IRegisterRequest } from './cognito.types';
import { InjectCognitoIdentityProvider } from '@nestjs-cognito/core';
import {
  AuthFlowType,
  AuthenticationResultType,
  CognitoIdentityProvider,
  SignUpCommandOutput,
  AdminConfirmSignUpCommandOutput,
  AttributeType,
  ConfirmSignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class Cognito implements ICognito {
  constructor(
    @InjectCognitoIdentityProvider()
    private readonly client: CognitoIdentityProvider,
  ) {}
  async createUser(registerRequest: IRegisterRequest): Promise<AdminConfirmSignUpCommandOutput | undefined> {
    const UserAttributes: AttributeType[] = [];
    if (!!registerRequest.email) {
      UserAttributes.push({ Name: 'email', Value: registerRequest.email });
    }
    if (!!registerRequest.phone_number) {
      UserAttributes.push({ Name: 'phone_number', Value: registerRequest.phone_number });
    }
    const result = await this.client.adminCreateUser({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: registerRequest.name,
      TemporaryPassword: registerRequest.password,
      UserAttributes,
    });

    if (!!registerRequest.phone_number) {
      await this.client.adminUpdateUserAttributes({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: registerRequest.name,
        UserAttributes: [...UserAttributes, { Name: 'phone_number_verified', Value: 'true' }],
      });
    }

    return result;
  }

  async addUserToGroup(username: string, groupName: string) {
    await this.client.adminAddUserToGroup({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      GroupName: groupName,
    });
  }

  async confirmSignUp(username: string): Promise<AdminConfirmSignUpCommandOutput | undefined> {
    const result = await this.client.adminConfirmSignUp({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });

    return result;
  }

  async confirmSignUpByCode(username: string, confirmationCode: string): Promise<ConfirmSignUpCommandOutput> {
    const result = await this.client.confirmSignUp({
      ClientId: process.env.COGNITO_CLIENT_ID,
      ConfirmationCode: confirmationCode,
      Username: username,
    });

    return result;
  }
  async delete(username: string): Promise<void> {
    await this.client.adminDisableUser({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });
    await this.client.adminDeleteUser({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });
  }
  async refreshToken(refreshToken: string): Promise<AuthenticationResultType | undefined> {
    const result = await this.client.initiateAuth({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });

    return result.AuthenticationResult;
  }

  async registerUser(registerRequest: IRegisterRequest): Promise<SignUpCommandOutput> {
    const { name, email, phone_number, password } = registerRequest;
    const UserAttributes: AttributeType[] = [];
    if (!!email) {
      UserAttributes.push({ Name: 'email', Value: email });
    }
    if (!!phone_number) {
      UserAttributes.push({ Name: 'phone_number', Value: phone_number });
    }
    const result = await this.client.signUp({
      Username: name,
      Password: password,
      ClientId: process.env.COGNITO_CLIENT_ID,
      UserAttributes,
    });

    if (!!phone_number) {
      await this.client.adminUpdateUserAttributes({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: name,
        UserAttributes: [...UserAttributes, { Name: 'phone_number_verified', Value: 'true' }],
      });
    }

    return result;
  }

  async authenticateUser(user: IAuthRequest): Promise<AuthenticationResultType | undefined> {
    const { name, password } = user;

    const result = await this.client.initiateAuth({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: name,
        PASSWORD: password,
      },
    });
    return result.AuthenticationResult;
  }

  async restorePassword(Username: string): Promise<string> {
    const result = await this.client.forgotPassword({
      Username,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });

    return result.CodeDeliveryDetails.Destination;
  }
  async confirmRestorePassword(username: string, confirmationCode: string, password: string): Promise<void> {
    await this.client.confirmForgotPassword({
      Username: username,
      Password: password,
      ConfirmationCode: confirmationCode,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });
  }
  async changePassword(token: string, previousPassword: string, newPassword: string): Promise<void> {
    await this.client.changePassword({
      AccessToken: token,
      PreviousPassword: previousPassword,
      ProposedPassword: newPassword,
    });
  }

  async resendConfirmationCode(username: string): Promise<void> {
    await this.client.resendConfirmationCode({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
    });
  }
}
