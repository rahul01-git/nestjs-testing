import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';
import { Category } from './category.entity';
import { CATEGORY_REPOSITORY } from 'src/core/constants';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoryService,
    {
      provide: CATEGORY_REPOSITORY,
      useValue: Category,
    },
  ],
})
export class CategoriesModule {}
