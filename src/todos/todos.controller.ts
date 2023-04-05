import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { CreateTodo } from './dto/create-todo.dto';
import { UpdateTodo } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createTodo(@Body() createTodo: CreateTodo) {
    return this.todoService.create(createTodo);
  }

  @Patch(':id')
  changeTodo(@Param('id') id: string, @Body() updatedTodo: UpdateTodo) {
    console.log('hiiiiiiiiiii');
    return this.todoService.update(id, updatedTodo);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
