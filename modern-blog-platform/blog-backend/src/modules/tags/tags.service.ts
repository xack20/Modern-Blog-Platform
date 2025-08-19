import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../prisma.service';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagInput: CreateTagInput) {
    const { name } = createTagInput;

    // Generate slug from name
    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    // Check if slug exists
    const slugExists = await this.prisma.tag.findUnique({
      where: { slug },
    });

    const finalSlug = slugExists ? `${slug}-${Date.now()}` : slug;

    // Create tag
    return this.prisma.tag.create({
      data: {
        name,
        slug: finalSlug,
      },
    });
  }

  async findAll() {
    return this.prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async findBySlug(slug: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { slug },
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with slug ${slug} not found`);
    }

    return tag;
  }

  async update(id: string, updateTagInput: UpdateTagInput) {
    const { name, slug } = updateTagInput;

    // Check if tag exists
    const tagExists = await this.prisma.tag.findUnique({
      where: { id },
    });

    if (!tagExists) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    // If name is provided, generate a new slug
    let finalSlug = slug;
    if (name && !slug) {
      finalSlug = slugify(name, {
        lower: true,
        strict: true,
      });

      // Check if new slug exists (and it's not the current tag)
      const slugExists = await this.prisma.tag.findFirst({
        where: {
          slug: finalSlug,
          id: { not: id },
        },
      });

      if (slugExists) {
        finalSlug = `${finalSlug}-${Date.now()}`;
      }
    }

    // Update tag
    return this.prisma.tag.update({
      where: { id },
      data: {
        name,
        slug: finalSlug,
      },
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        posts: {
          select: { postId: true },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    // Check if tag has posts
    if (tag.posts.length > 0) {
      // Delete post-tag relationships
      await this.prisma.postTag.deleteMany({
        where: { tagId: id },
      });
    }

    // Delete tag
    await this.prisma.tag.delete({
      where: { id },
    });

    return true;
  }
}
