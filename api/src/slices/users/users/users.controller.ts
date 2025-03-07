import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { IUsersGateway,  IUserData } from './domain';
import { CreateUserDto, UpdateUserDto, UserDto, FilterUserDto } from './dtos';
import { ApiSingleResponse, ApiPaginatedResponse, IMetaResponse } from '#core';
import { Roles } from '#users/auth/roles.decorator';
import { RoleTypes } from '#users/users';
@ApiTags('users')
//TODO: user can update himself... maybe move this to auth.
// @Roles(RoleTypes.Admin)
@Controller('users')
export class UsersController {
  constructor(private usersGateway: IUsersGateway) {}

  @ApiOperation({ description: 'List all users', operationId: 'getUsers' })
  @ApiPaginatedResponse(UserDto)
  @Get()
  async getUsers(@Query() query: FilterUserDto): Promise<{ data: IUserData[]; meta: IMetaResponse }> {
    return await this.usersGateway.getUsers(query);
  }

  @ApiOperation({ description: 'Get a user', operationId: 'getUser' })
  @ApiSingleResponse(UserDto)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUserData> {
    return await this.usersGateway.getUser(id);
  }

  @ApiOperation({ description: 'Create a new user', operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @ApiSingleResponse(UserDto)
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<IUserData> {
    return await this.usersGateway.createUser(data);
  }

  @ApiOperation({ description: 'Update a user', operationId: 'updateUser' })
  @ApiBody({ type: UpdateUserDto })
  @ApiSingleResponse(UserDto)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IUserData> {
    return await this.usersGateway.updateUser(id, data);
  }

  @ApiOperation({ description: 'Delete a user', operationId: 'deleteUser' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    return await this.usersGateway.deleteUser(id);
  }
}
