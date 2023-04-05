import { CreateTodo } from './dto/create-todo.dto';
import { Injectable, Inject } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { UpdateTodo } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODOS_REPOSITORY')
    private todosRepository: typeof Todo,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.findAll();
  }

  async create(createTodo: CreateTodo): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodo.title;
    todo.completed = createTodo.completed;
    todo.parentId = createTodo.parentId;
    return todo.save();
  }

  async update(
    id: string,
    updateTodo: UpdateTodo,
  ): Promise<[affectedCount: number, affectedRows: Todo[]]> {
    return this.todosRepository.update(
      { ...updateTodo },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
  }

  async remove(id: string): Promise<void> {
    const todo = await this.todosRepository.findOne({
      where: {
        id,
      },
    });
    await todo.destroy();
  }
}
