import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Payload from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginUserDto): Promise<any> {
    const user = await this.userService.findByEmail(data.email);

    if (!user) throw new HttpException('Wrong credentials provided', 400);

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) throw new HttpException('Wrong credentials provided', 400);

    delete user['_doc'].password;

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async register(data: CreateUserDto): Promise<User> {
    const user = await this.userService.findByEmail(data.email);

    if (user) throw new HttpException('User already exist', 409);

    const password = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password,
    };

    return this.userService.createUser(userData);
  }

  async validateToken(payload: Payload): Promise<User> {
    const user = await this.userService.findById(payload.id);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
