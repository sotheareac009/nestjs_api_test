// src/database/seed.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { VIDEO_SEED_DATA } from './seeds/video.seed';

const prisma = new PrismaClient();

async function seed() {
    console.log('🌱 Seeding videos...');

    await prisma.video.createMany({
        data: VIDEO_SEED_DATA.map(video => ({
            title: video.title,
            channel: video.channel,
            cover: video.cover,
            duration: video.duration,
            views: video.views,
            url: video.url,
        })),
        skipDuplicates: true, // avoid duplicates on multiple runs
    });

    console.log('✅ Video seed finished!');
}

seed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
