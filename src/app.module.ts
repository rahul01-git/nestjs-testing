import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from './modules/categories/category.entity';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from './modules/tasks/task.entity';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    SequelizeModule.forRoot({
      uri: process.env.DATABASE_URL,
      models: [Category, Task, User],
      logging: false,
    }),
    CategoriesModule,
    TasksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed', error.stack);
    }
  }
}
