import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategoriesSeedService } from '../categories/seed/categories.seed.service';
import { VideosSeedService } from 'src/video/seeds/video-seeder.service';

async function bootstrap() {
    // create a NestJS application context (no HTTP server)
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        console.log('🌱 Seeding categories...');
        const categoriesSeedService = app.get(CategoriesSeedService);
        await categoriesSeedService.seed();
        console.log('✅ Category seed finished!');

        console.log('🌱 Seeding videos...');
        const videosSeedService = app.get(VideosSeedService);
        await videosSeedService.seed();
        console.log('✅ Video seed finished!');
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    } finally {
        // close app and DB connection
        await app.close();
    }
}

bootstrap();
