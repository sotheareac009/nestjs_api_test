import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VIDEO_SEED_DATA } from './video.seed';
import { Video } from '../entities/video.entity';

@Injectable()
export class VideosSeedService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepo: Repository<Video>,
    ) { }

    async seed() {
        for (const video of VIDEO_SEED_DATA) {
            const exists = await this.videoRepo.findOne({ where: { title: video.title } });
            if (!exists) {
                await this.videoRepo.save(this.videoRepo.create(video));
            }
        }
    }
}
