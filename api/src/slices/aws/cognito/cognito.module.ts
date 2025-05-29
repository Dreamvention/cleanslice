import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoAuthModule, AuthenticationGuard } from '@nestjs-cognito/auth';
import { Cognito } from './data';

@Module({
  imports: [
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        jwtVerifier: {
          userPoolId: configService.get('COGNITO_USER_POOL_ID') as string,
          clientId: configService.get('COGNITO_CLIENT_ID'),
          tokenUse: 'id',
          region: configService.get('AWS_REGION'),
          endpoint: configService.get('COGNITO_ENDPOINT'),
        },
        identityProvider: {
          region: configService.get('AWS_REGION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Cognito, AuthenticationGuard],
  exports: [Cognito, AuthenticationGuard],
})
export class CognitoModule {}
