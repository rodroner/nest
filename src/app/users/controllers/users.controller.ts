import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: AuthService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('find-by-email')
  async findByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }
}

