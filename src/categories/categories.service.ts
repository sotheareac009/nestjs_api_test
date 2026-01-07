import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) { }

    create(dto: CreateCategoryDto) {
        const category = this.categoryRepo.create(dto);
        return this.categoryRepo.save(category);
    }

    findAll() {
        return this.categoryRepo.find();
    }
}
