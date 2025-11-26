import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.guard';
import { RegisterDto } from './dto/register.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from './domain/user';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('register')
  @ApiCreatedResponse({ type: User })
  async registerUser(@Body() user: RegisterDto) {
    return await this.userService.createUser(user.email, user.password);
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  async findUsers() {
    return await this.userService.findUsers();
  }
}
