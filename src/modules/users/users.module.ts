import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './users.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useValue: User,
    },
  ],
})
export class UsersModule {}
