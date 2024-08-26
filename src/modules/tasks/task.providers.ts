import { TASK_REPOSITORY } from 'src/core/constants';
import { Task } from './task.entity';

export const TaskProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];
