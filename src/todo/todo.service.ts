import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Todo } from './schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
  ) {}

  async findOne(id): Promise<Todo> {
    return this.todoModel.findById(id);
  }

  async findAllByUser(user): Promise<Todo[]> {
    return this.todoModel.find({ user: user.id });
  }

  async findAllTodos(): Promise<Todo[]> {
    return this.todoModel.find();
  }

  async createOne(data: CreateTodoDto, user: User): Promise<Todo> {
    const newTodo = new this.todoModel({
      ...data,
      user: user._id,
    });

    return newTodo.save();
  }

  async deleteOne(id): Promise<Todo> {
    return this.todoModel.findOneAndDelete(id);
  }
}
