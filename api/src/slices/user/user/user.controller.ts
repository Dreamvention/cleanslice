import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { IUserGateway, IUserData } from './domain';
import { CreateUserDto, UpdateUserDto, UserDto, FilterUserDto } from './dtos';
import { ApiSingleResponse, ApiPaginatedResponse, IMetaResponse } from '#core';
import { Role } from '../auth/role.decorator';
import { RoleTypes } from '#user/user';
@ApiTags('users')
//TODO: user can update himself... maybe move this to auth.
// @Role(RoleTypes.Admin)
@Controller('users')
export class UserController {
  constructor(private userGateway: IUserGateway) {}

  @ApiOperation({ description: 'List all users', operationId: 'getUsers' })
  @ApiPaginatedResponse(UserDto)
  @Get()
  async getUsers(@Query() query: FilterUserDto): Promise<{ data: IUserData[]; meta: IMetaResponse }> {
    return await this.userGateway.getUsers(query);
  }

  @ApiOperation({ description: 'Get a user', operationId: 'getUser' })
  @ApiSingleResponse(UserDto)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUserData> {
    return await this.userGateway.getUser(id);
  }

  @ApiOperation({ description: 'Create a new user', operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @ApiSingleResponse(UserDto)
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<IUserData> {
    return await this.userGateway.createUser(data);
  }

  @ApiOperation({ description: 'Update a user', operationId: 'updateUser' })
  @ApiBody({ type: UpdateUserDto })
  @ApiSingleResponse(UserDto)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IUserData> {
    return await this.userGateway.updateUser(id, data);
  }

  @ApiOperation({ description: 'Delete a user', operationId: 'deleteUser' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    return await this.userGateway.deleteUser(id);
  }
}
