import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schema/todo.schema';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  exports: [TodoService],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
