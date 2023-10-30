import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedCategory: Partial<Category>): Promise<Category> {
    return this.categoryService.update(id, updatedCategory);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
