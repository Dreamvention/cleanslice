import { Controller, Post, Body } from '@nestjs/common';
import { IAuthGateway, IAuthData } from './domain';
import { RegisterUserDto, LoginUserDto, AuthDto } from './dtos';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authGateway: IAuthGateway) {}

  @ApiOperation({ description: 'Login with email and password', operationId: 'login' })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: AuthDto })
  @Post('login')
  async login(@Body() data: LoginUserDto): Promise<IAuthData> {
    return await this.authGateway.login(data.email, data.password);
  }

  @ApiOperation({ description: 'Register a new user', operationId: 'register' })
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: AuthDto })
  @Post('register')
  async register(@Body() data: RegisterUserDto): Promise<IAuthData> {
    return await this.authGateway.register(data);
  }

  @ApiOperation({ description: 'Refresh access token', operationId: 'refresh' })
  @ApiBody({ type: RegisterUserDto })
  @ApiOkResponse({ type: AuthDto })
  @Post('refresh')
  async refresh(@Body() refreshToken: string): Promise<IAuthData> {
    return await this.authGateway.refreshToken(refreshToken);
  }
}
