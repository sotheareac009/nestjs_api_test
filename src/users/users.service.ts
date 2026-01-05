import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    // Create a new user
    async create(dto: CreateUserDto) {
        return this.prisma.user.create({ data: dto });
    }

    // Get all users
    async findAll() {
        return this.prisma.user.findMany();
    }

    // Get a single user by ID
    async findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    // Update a user
    async update(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: dto,
        });
    }

    // Delete a user
    async remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
