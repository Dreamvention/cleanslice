import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IUsersGateway } from './domain/gateways';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Controller('users')
export class UsersController {
  constructor(private usersGateway: IUsersGateway) {}

  @Get()
  async getUsers() {
    return await this.usersGateway.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersGateway.getUser(parseInt(id));
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.usersGateway.createUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.usersGateway.updateUser(parseInt(id), data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersGateway.deleteUser(parseInt(id));
  }
}
