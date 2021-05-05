import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  UseGuards,
  ValidationPipe,
  UnauthorizedException,
  Put,
  Delete,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/currentUser/currentUser.decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guards';
import { User } from 'src/user/schema/user.schema';
import { Todo } from './schema/todo.schema';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  // Check if user can do something
  private can(todoUser, currentUser) {
    if (String(todoUser) !== currentUser.id && currentUser.role !== 'admin')
      return false;
    return true;
  }

  // Admin get all todos
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Get('all')
  async findAllTodos(): Promise<Todo[]> {
    return this.todoService.findAllTodos();
  }

  // User get todos
  @Get()
  async findAllByUser(@CurrentUser() user: User): Promise<Todo[]> {
    return this.todoService.findAllByUser(user);
  }

  // Get one todo
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);

    if (!todo) throw new HttpException('Todo not found', 404);

    const hasRights = this.can(todo.user, user);

    if (!hasRights) throw new UnauthorizedException();

    return todo;
  }

  // Create todo
  @Post()
  async createOne(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    return this.todoService.createOne(createTodoDto, user);
  }

  // Update todo
  @Put(':id')
  async updateOne(
    @Body(ValidationPipe) updateTodoDto: CreateTodoDto,
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);

    if (!todo) throw new HttpException('Todo not found', 404);

    const hasRights = this.can(todo.user, user);

    if (!hasRights) throw new UnauthorizedException();

    Object.assign(todo, updateTodoDto);

    return todo.save();
  }

  // Delete todo
  @Delete(':id')
  async deleteOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);

    if (!todo) throw new HttpException('Todo not found', 404);

    const hasRights = this.can(todo.user, user);

    if (!hasRights) throw new UnauthorizedException();

    return this.todoService.deleteOne(todo.id);
  }
}
