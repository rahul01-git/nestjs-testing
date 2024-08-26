import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TASK_REPOSITORY } from 'src/core/constants';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repository: typeof Task,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.repository.findAll({ order: [['id', 'ASC']] });
  }

  async findById(id: number): Promise<Task | null> {
    return this.repository.findByPk(id);
  }

  async create(taskDto: TaskDto): Promise<Task> {
    return this.repository.create(taskDto);
  }

  async update(
    id: number,
    updateData: Partial<TaskDto>,
  ): Promise<[number, Task[]]> {
    return this.repository.update(updateData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.repository.destroy({ where: { id } });
  }
}
