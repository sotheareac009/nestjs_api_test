import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from 'src/video/entities/video.entity';
import { VIDEO_SEED_DATA } from './video.seed';

@Injectable()
export class VideoSeederService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepo: Repository<Video>,
    ) { }

    async seed() {
        const count = await this.videoRepo.count();
        if (count > 0) return;

        await this.videoRepo.save(VIDEO_SEED_DATA);
        console.log('🌱 Video seeded');
    }
}
