import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { TASK_REPOSITORY } from 'src/core/constants';
import { Task } from './task.entity';

@Module({
  controllers: [TasksController],
  providers: [
    TaskService,
    {
      provide: TASK_REPOSITORY,
      useValue: Task,
    },
  ],
})
export class TasksModule {}
