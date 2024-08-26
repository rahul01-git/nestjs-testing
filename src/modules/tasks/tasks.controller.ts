import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Logger,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    this.logger.log('Fetching all tasks');
    const tasks = await this.taskService.findAll();
    this.logger.log(`Fetched ${tasks.length} tasks`);
    return tasks;
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    this.logger.log(`Fetching task with id ${id}`);
    const task = await this.taskService.findById(+id);
    if (task) {
      this.logger.log(`Fetched task with id ${id}`);
    } else {
      this.logger.warn(`Task with id ${id} not found`);
    }
    return task;
  }

  @Post()
  async createTask(@Body() taskDto: TaskDto) {
    this.logger.log('Creating new task');
    const task = await this.taskService.create(taskDto);
    this.logger.log(`Created task with id ${task.id}`);
    return task;
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() taskDto: TaskDto) {
    this.logger.log(`Updating task with id ${id}`);
    const [affectedCount, data] = await this.taskService.update(+id, taskDto);
    if (affectedCount > 0) {
      this.logger.log(`Updated task with id ${id}`);
    } else {
      this.logger.warn(`Task with id ${id} not found for update`);
    }
    return { affectedCount, data };
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    this.logger.log(`Deleting task with id ${id}`);
    const affectedCount = await this.taskService.delete(+id);
    if (affectedCount > 0) {
      this.logger.log(`Deleted task with id ${id}`);
    } else {
      this.logger.warn(`Task with id ${id} not found for deletion`);
    }
    return affectedCount;
  }
}
