import { Controller, Get, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  async createUsers(@Body() data: any) {
    return await this.usersService.createUser(data);
  }
}
