import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateMediaInput } from './dto/create-media.input';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createMediaInput: CreateMediaInput) {
    return this.prisma.media.create({
      data: {
        ...createMediaInput,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: true,
      },
    });
  }

  async findAll() {
    return this.prisma.media.findMany({
      include: {
        user: true,
      },
    });
  }

  async findUserMedia(userId: string) {
    return this.prisma.media.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.media.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async remove(id: string) {
    // Normally, you'd also want to remove the actual file from storage
    // For example, if using AWS S3, you'd delete the file from the bucket
    // This implementation just removes the database record

    return this.prisma.media.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }
}
