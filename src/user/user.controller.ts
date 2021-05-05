import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/currentUser/currentUser.decorator';
import { JwtGuard } from 'src/auth/guards';
import { User } from './schema/user.schema';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
