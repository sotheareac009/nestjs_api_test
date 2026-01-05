import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateVideoDto) {
    return this.prisma.video.create({ data: dto });
  }

  async findAll() {
    return this.prisma.video.findMany();
  }

  async findOne(id: string) {
    const video = await this.prisma.video.findUnique({ where: { id } });
    if (!video) throw new NotFoundException(`Video with id ${id} not found`);
    return video;
  }

  async update(id: string, dto: UpdateVideoDto) {
    await this.findOne(id); // throw if not exist
    return this.prisma.video.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id); // throw if not exist
    return this.prisma.video.delete({ where: { id } });
  }
}
