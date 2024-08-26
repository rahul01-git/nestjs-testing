import { Injectable, Inject } from '@nestjs/common';
import { TASK_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';
import { User } from './users.entity';
import { CategoryService } from '../categories/categories.service';
import { Task } from '../tasks/task.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: typeof User,

    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: typeof Task,

    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<{
    totalCategories: number;
    totalTasks: number;
    users: User[];
  }> {
    const totalTasks = (await this.taskRepository.findAll()).length;
    const totalCategories = (await this.categoryService.findAll()).length;
    const users = await this.repository.findAll({ order: [['id', 'ASC']] });

    return { totalCategories, totalTasks, users };
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findByPk(id);
  }
}
