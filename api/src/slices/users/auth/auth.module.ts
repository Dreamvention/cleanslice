import { Module } from '@nestjs/common';
import { IAuthGateway } from './domain/gateways';
import { AuthGateway } from './data/gateways';
import { PrismaModule } from 'src/slices/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { authConfig } from './auth.config';
import { UsersModule } from '../users/users.module';
// Set Global AuthGuard
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';

@Module({
  imports: [PrismaModule, JwtModule.register(authConfig), UsersModule],
  providers: [
    { provide: IAuthGateway, useClass: AuthGateway },

    // ,{
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
