import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IUsersGateway } from './domain/gateways';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersGateway: IUsersGateway) {}

  @ApiOperation({ description: 'List all users', operationId: 'getUsers' })
  @Get()
  async getUsers() {
    return await this.usersGateway.getUsers();
  }

  @ApiOperation({ description: 'Get a user', operationId: 'getUser' })
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersGateway.getUser(parseInt(id));
  }

  @ApiOperation({ description: 'Create a new user', operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.usersGateway.createUser(data);
  }

  @ApiOperation({ description: 'Update a user', operationId: 'updateUser' })
  @ApiBody({ type: UpdateUserDto })
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.usersGateway.updateUser(parseInt(id), data);
  }

  @ApiOperation({ description: 'Delete a user', operationId: 'deleteUser' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersGateway.deleteUser(parseInt(id));
  }
}
