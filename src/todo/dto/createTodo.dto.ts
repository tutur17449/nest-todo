import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { todoStatus } from '../schema/todo.schema';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsEnum(todoStatus)
  @IsNotEmpty()
  status: todoStatus;
}
