import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Video } from './video/entities/video.entity';
import { VideosSeedService } from './video/seeds/video-seeder.service';
import { VideoModule } from './video/video.module';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL, // <-- use your env variable
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // ✅ include all entities
      logging: true, // optional for debugging
    }),
    TypeOrmModule.forFeature([Video]),
    VideoModule,
    PrismaModule,
    CategoriesModule,
  ],
  providers: [VideosSeedService],
})
export class AppModule { }
