import { Controller, Get, Param, Logger } from '@nestjs/common';
import { User } from './users.entity';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{
    totalCategories: number;
    totalTasks: number;
    users: User[];
  }> {
    this.logger.log('Fetching all users');
    const { users, totalCategories, totalTasks } =
      await this.userService.findAll();
    this.logger.log(`Fetched ${users.length} users`);
    this.logger.log(`Fetched ${totalCategories} categories`);
    this.logger.log(`Fetched ${totalTasks} tasks`);
    return { users, totalCategories, totalTasks };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    this.logger.log(`Fetching user with id ${id}`);
    const user = await this.userService.findById(+id);
    if (user) {
      this.logger.log(`Fetched user with id ${id}`);
    } else {
      this.logger.warn(`User with id ${id} not found`);
    }
    return user;
  }
}
