import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';
import { CategoryProviders } from './categories.providers';

@Module({
  controllers: [CategoriesController],
  providers: [CategoryService, ...CategoryProviders],
  exports: [CategoryService],
})
export class CategoriesModule {}
