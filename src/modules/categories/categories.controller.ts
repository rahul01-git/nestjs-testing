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
import { CategoryService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    this.logger.log('Fetching all categories');
    const categories = await this.categoryService.findAll();
    this.logger.log(`Fetched ${categories.length} categories`);
    return categories;
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    this.logger.log(`Fetching category with id ${id}`);
    const category = await this.categoryService.findById(+id);
    if (category) {
      this.logger.log(`Fetched category with id ${id}`);
    } else {
      this.logger.warn(`Category with id ${id} not found`);
    }
    return category;
  }

  @Post()
  async createCategory(@Body() categoryDto: CategoryDto) {
    this.logger.log('Creating new category');
    const category = await this.categoryService.create(categoryDto);
    this.logger.log(`Created category with id ${category.id}`);
    return category;
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ) {
    this.logger.log(`Updating category with id ${id}`);
    const [affectedCount, data] = await this.categoryService.update(
      +id,
      categoryDto,
    );
    if (affectedCount > 0) {
      this.logger.log(`Updated category with id ${id}`);
    } else {
      this.logger.warn(`Category with id ${id} not found for update`);
    }
    return { affectedCount, data };
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    this.logger.log(`Deleting category with id ${id}`);
    const affectedCount = await this.categoryService.delete(+id);
    if (affectedCount > 0) {
      this.logger.log(`Deleted category with id ${id}`);
    } else {
      this.logger.warn(`Category with id ${id} not found for deletion`);
    }
    return affectedCount;
  }
}
