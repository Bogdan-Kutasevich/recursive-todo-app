import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todos.module';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
