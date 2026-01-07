import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category.entity';
import { SAMPLE_CATEGORIES_LIST } from './categories.seed';

@Injectable()
export class CategoriesSeedService {
    private readonly logger = new Logger(CategoriesSeedService.name);

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) { }

    async seed() {
        for (const item of SAMPLE_CATEGORIES_LIST) {
            const existing = await this.categoryRepo.findOne({
                where: { value: item.value },
            });

            if (!existing) {
                // ➕ Insert new
                await this.categoryRepo.save(this.categoryRepo.create(item));
                this.logger.log(`Inserted: ${item.value}`);
            } else {
                // ⏭ Skip existing
                this.logger.log(`Skipped (already exists): ${item.value}`);
            }
        }

        this.logger.log('Category seeding completed');
    }
}
