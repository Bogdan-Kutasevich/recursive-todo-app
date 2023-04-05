import { Module } from '@nestjs/common';
import { TodoController } from './todos.controller';
import { TodoService } from './todos.service';
import { todosProviders } from './todos.providers';
import { DatabaseModule } from './database.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...todosProviders],
})
export class TodoModule {}
