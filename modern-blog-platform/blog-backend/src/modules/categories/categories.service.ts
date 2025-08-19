import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const { name, description } = createCategoryInput;

    // Generate slug from name
    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    // Check if slug exists
    const slugExists = await this.prisma.category.findUnique({
      where: { slug },
    });

    const finalSlug = slugExists ? `${slug}-${Date.now()}` : slug;

    // Create category
    return this.prisma.category.create({
      data: {
        name,
        description,
        slug: finalSlug,
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        posts: true,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        posts: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with slug ${slug} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const { name, description, slug } = updateCategoryInput;

    // Check if category exists
    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // If name is provided, generate a new slug
    let finalSlug = slug;
    if (name && !slug) {
      finalSlug = slugify(name, {
        lower: true,
        strict: true,
      });

      // Check if new slug exists (and it's not the current category)
      const slugExists = await this.prisma.category.findFirst({
        where: {
          slug: finalSlug,
          id: { not: id },
        },
      });

      if (slugExists) {
        finalSlug = `${finalSlug}-${Date.now()}`;
      }
    }

    // Update category
    return this.prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        slug: finalSlug,
      },
      include: {
        posts: true,
      },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        posts: {
          select: { id: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if category has posts
    if (category.posts.length > 0) {
      // Update posts to remove category
      await this.prisma.post.updateMany({
        where: { categoryId: id },
        data: { categoryId: null },
      });
    }

    // Delete category
    await this.prisma.category.delete({
      where: { id },
    });

    return true;
  }
}
