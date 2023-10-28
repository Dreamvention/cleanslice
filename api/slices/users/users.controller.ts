import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IUsersGateway } from './domain/gateways';
import { IUserData } from './domain/entities';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersGateway: IUsersGateway) {}

  @ApiOperation({ description: 'List all users', operationId: 'getUsers' })
  @ApiOkResponse({ type: [UserDto] })
  @Get()
  async getUsers(): Promise<IUserData[]> {
    return await this.usersGateway.getUsers();
  }

  @ApiOperation({ description: 'Get a user', operationId: 'getUser' })
  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUserData> {
    return await this.usersGateway.getUser(parseInt(id));
  }

  @ApiOperation({ description: 'Create a new user', operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<IUserData> {
    return await this.usersGateway.createUser(data);
  }

  @ApiOperation({ description: 'Update a user', operationId: 'updateUser' })
  @ApiBody({ type: UpdateUserDto })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IUserData> {
    return await this.usersGateway.updateUser(parseInt(id), data);
  }

  @ApiOperation({ description: 'Delete a user', operationId: 'deleteUser' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    return await this.usersGateway.deleteUser(parseInt(id));
  }
}
