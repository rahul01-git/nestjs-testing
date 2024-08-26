import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.findAll({ order: [['id', 'ASC']] });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findByPk(id);
  }
}
