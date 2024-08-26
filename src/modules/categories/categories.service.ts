import { Inject, Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: typeof Category,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.repository.findAll({ order: [['id', 'ASC']] });
  }

  async findById(id: number): Promise<Category | null> {
    return this.repository.findByPk(id);
  }

  async create(category: CategoryDto): Promise<Category> {
    return this.repository.create(category);
  }

  async update(
    id: number,
    updateData: Partial<CategoryDto>,
  ): Promise<[number, Category[]]> {
    return this.repository.update(updateData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.repository.destroy({ where: { id } });
  }
}
