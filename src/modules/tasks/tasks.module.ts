import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { TaskProviders } from './task.providers';

@Module({
  controllers: [TasksController],
  providers: [TaskService, ...TaskProviders],
  exports: [...TaskProviders],
})
export class TasksModule {}
