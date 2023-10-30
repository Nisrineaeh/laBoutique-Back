import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    console.log('SERVICE DTO', createProductDto);
    const product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.quantity = createProductDto.quantity;
    product.user_id = createProductDto.user_id;
    product.category_id = createProductDto.category_id;
    console.log('PRODUCT !!!!!!!!!', product)

    const result = await this.productRepository.save(product);
    console.log('RESULT', result)

    return result;
  }


  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({where:{id:id}});
    if (!product) {
      throw new NotFoundException(`Le produit avec le id : ${id} existe pas`);
    }
    return product;
  }

  async update(id: number, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
