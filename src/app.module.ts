import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Video } from './video/entities/video.entity';
import { VideoSeederService } from './database/seeds/video-seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL, // <-- use your env variable
      autoLoadEntities: true,
      synchronize: true,
      logging: true, // optional for debugging
    }),
    TypeOrmModule.forFeature([Video]),
  ],
  providers: [VideoSeederService],
})
export class AppModule { }
