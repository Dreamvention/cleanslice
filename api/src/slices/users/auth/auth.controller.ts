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
  @ApiOperation({ description: 'Login with email and password', operationId: 'login' })
  @ApiBody({ type: LoginUserDto })
  @FlatResponse()
  @ApiOkResponse({ type: AuthDto })
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return await this.authGateway.login(data.email, data.password);
  }

  @Public()
  @ApiOperation({ description: 'Register a new user', operationId: 'register' })
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: UserDto })
  @ApiResponse({ status: 409, description: 'User already exists', type: BaseErrorDto })
  @Post('register')
  async register(@Body() data: RegisterUserDto): Promise<IUserData> {
    data.roles = [RoleTypes.User];
    return await this.authGateway.register(data);
  }

  @Public()
  @ApiOperation({ description: 'Refresh access token', operationId: 'refresh' })
  @ApiBody({ type: RefreshTokenDto })
  @FlatResponse()
  @ApiOkResponse({ type: AuthDto })
  @Post('refresh')
  async refresh(@Body() refreshToken: RefreshTokenDto): Promise<IAuthData> {
    return await this.authGateway.refreshToken(refreshToken.token);
  }

  @Public()
  @Get('confirm')
  @Redirect()
  @FlatResponse()
  async confirm(
    @Query('code') code: string,
    @Query('username') username: string,
    @Query('redirectUrl') redirectUrl: string,
  ) {
    try {
      await this.authGateway.confirm(username, code);
      return { url: redirectUrl };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Public()
  @ApiOperation({ description: 'Resend confirm email to username', operationId: 'resendConfirm' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
  })
  @Post('resendConfirm')
  async resendConfirm(@Body('name') name: string) {
    try {
      await this.authGateway.resendConfirm(name);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
