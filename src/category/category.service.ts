import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

 async create(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }
  
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({where:{id:id}});
  }

 

  async update(id: number, updatedCategory: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, updatedCategory);
    return this.categoryRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
