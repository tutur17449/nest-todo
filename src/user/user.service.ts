import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findById(id): Promise<User> {
    return this.userModel.findById(id);
  }

  async createUser(data): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }
}
