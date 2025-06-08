import { Controller, Post, Body, Get, Redirect, Query, BadRequestException } from '@nestjs/common';
import { IAuthGateway, IAuthData } from './domain';
import { RegisterUserDto, LoginUserDto, AuthDto, RefreshTokenDto } from './dtos';
import { UserDto, IUserData, RoleTypes } from '#users/users';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { FlatResponse, BaseErrorDto } from '#core';
import { ApiSingleResponse } from '#/core';
import { User } from './user.decorator';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authGateway: IAuthGateway) {}

  @ApiOperation({
    summary: 'Get Current User',
    description:
      'Retrieves the profile information of the currently authenticated user. Requires a valid JWT access token.',
    operationId: 'me',
  })
  @ApiSingleResponse(UserDto)
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing access token',
    type: BaseErrorDto,
  })
  @Get('/me')
  async getLoggedInUser(@User() user: any) {
    return user;
  }

  @Public()
  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticates a user and returns JWT access and refresh tokens.',
    operationId: 'login',
  })
  @ApiBody({
    type: LoginUserDto,
    description: 'User login credentials',
    examples: {
      validCredentials: {
        value: {
          email: 'user@example.com',
          password: 'securePassword123',
          deviceId: 'device-123',
        },
      },
    },
  })
  @ApiSingleResponse(AuthDto)
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials or validation error',
    type: BaseErrorDto,
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid email or password',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    type: BaseErrorDto,
  })
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    try {
      return await this.authGateway.login(data.email, data.password);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Public()
  @ApiOperation({
    summary: 'User Registration',
    description:
      'Creates a new user account. The user will receive a confirmation email to verify their email address.',
    operationId: 'register',
  })
  @ApiBody({
    type: RegisterUserDto,
    description: 'User registration information',
    examples: {
      newUser: {
        value: {
          email: 'newuser@example.com',
          password: 'securePassword123',
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    },
  })
  @ApiSingleResponse(UserDto)
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    type: BaseErrorDto,
    schema: {
      example: {
        statusCode: 409,
        message: 'User with this email already exists',
        error: 'Conflict',
      },
    },
  })
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
  @ApiOperation({
    summary: 'Confirm Email',
    description: "Confirms a user's email address using the token sent in the confirmation email.",
    operationId: 'confirmEmail',
  })
  @ApiQuery({
    name: 'token',
    description: 'Email confirmation token',
    type: String,
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiQuery({
    name: 'email',
    description: 'Email address to confirm',
    type: String,
    required: true,
    example: 'user@example.com',
  })
  @ApiOkResponse({
    description: 'Email successfully confirmed',
    schema: {
      example: {
        message: 'Email confirmed successfully',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired confirmation token',
    type: BaseErrorDto,
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid or expired confirmation token',
        error: 'Bad Request',
      },
    },
  })
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
  @ApiOperation({
    summary: 'Resend Confirmation Email',
    description: 'Resends the email confirmation link to the specified email address.',
    operationId: 'resendConfirmation',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Email address to resend confirmation to',
          example: 'user@example.com',
        },
      },
      required: ['email'],
    },
  })
  @ApiOkResponse({
    description: 'Confirmation email sent successfully',
    schema: {
      example: {
        message: 'Confirmation email sent successfully',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email or user not found',
    type: BaseErrorDto,
    schema: {
      example: {
        statusCode: 400,
        message: 'User not found or email already confirmed',
        error: 'Bad Request',
      },
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
  @ApiOperation({
    summary: 'Refresh Access Token',
    description: 'Generates a new access token using a valid refresh token.',
    operationId: 'refreshToken',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          description: 'Valid refresh token',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
      required: ['refreshToken'],
    },
  })
  @ApiSingleResponse(AuthDto)
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired refresh token',
    type: BaseErrorDto,
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid or expired refresh token',
        error: 'Bad Request',
      },
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
