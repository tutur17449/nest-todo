import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
