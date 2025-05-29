import { Controller, Post, Body, Get, Redirect, Query, BadRequestException } from '@nestjs/common';
import { IAuthGateway, IAuthData } from './domain';
import { RegisterUserDto, LoginUserDto, AuthDto, RefreshTokenDto } from './dtos';
import { UserDto, IUserData, RoleTypes } from '#users/users';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { FlatResponse, BaseErrorDto } from '#core';
import { ApiSingleResponse } from '#/core';
import { User } from './user.decorator';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authGateway: IAuthGateway) {}

  @ApiOperation({ description: 'Returns currently logged in user', operationId: 'me' })
  @ApiSingleResponse(UserDto)
  @Get('/me')
  async getLoggedInUser(@User() user: any) {
    return user;
  }

  @Public()
  @ApiOperation({ description: 'Login user', operationId: 'login' })
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    try {
      return await this.authGateway.login(data.email, data.password);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Public()
  @ApiOperation({ description: 'Register user', operationId: 'register' })
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: UserDto })
  @ApiResponse({ status: 409, description: 'User already exists', type: BaseErrorDto })
  @Post('register')
  async register(@Body() data: RegisterUserDto): Promise<IUserData> {
    data.roles = [RoleTypes.User];
    try {
      return await this.authGateway.register(data);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Public()
  @ApiOperation({ description: 'Confirm email', operationId: 'confirm' })
  @Get('confirm')
  async confirm(@Query('token') token: string, @Query('email') email: string) {
    try {
      await this.authGateway.confirm(token, email);
      return { message: 'Email confirmed successfully' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Public()
  @ApiOperation({ description: 'Resend confirmation email', operationId: 'resendConfirm' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
      required: ['email'],
    },
  })
  @Post('resendConfirm')
  async resendConfirm(@Body('email') email: string) {
    try {
      await this.authGateway.resendConfirm(email);
      return { message: 'Confirmation email sent successfully' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Public()
  @ApiOperation({ description: 'Refresh token', operationId: 'refreshToken' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string' },
      },
      required: ['refreshToken'],
    },
  })
  @Post('refreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    try {
      return await this.authGateway.refreshToken(refreshToken);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
