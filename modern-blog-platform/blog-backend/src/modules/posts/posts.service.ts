import { Injectable, NotFoundException } from '@nestjs/common';
import { PostStatus } from '@prisma/client';
import slugify from 'slugify';
import { PrismaService } from '../../prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { PostsFilterInput } from './dto/posts-filter.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createPostInput: CreatePostInput) {
    const { tagIds, ...postData } = createPostInput;

    // Generate slug from title
    const slug = slugify(postData.title, {
      lower: true,
      strict: true,
    });

    // Check if slug exists
    const slugExists = await this.prisma.post.findUnique({
      where: { slug },
    });

    const finalSlug = slugExists ? `${slug}-${Date.now()}` : slug;

    // Set publishedAt if status is PUBLISHED
    const publishedAt =
      postData.status === PostStatus.PUBLISHED ? new Date() : null;

    // Create post with relationships
    const { categoryId, ...postDataWithoutCategory } = postData;

    const post = await this.prisma.post.create({
      data: {
        ...postDataWithoutCategory,
        slug: finalSlug,
        publishedAt,
        author: {
          connect: { id: authorId },
        },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags:
          tagIds && tagIds.length > 0
            ? {
                create: tagIds.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Transform the result to match the GraphQL schema
    return {
      ...post,
      tags: post.tags?.map((pt) => pt.tag) || [],
    };
  }

  async findAll(filters: PostsFilterInput = {}) {
    const {
      status,
      categoryId,
      tagId,
      authorId,
      limit = 10,
      offset = 0,
      search,
    } = filters;

    // Build the where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (authorId) {
      where.authorId = authorId;
    }

    if (tagId) {
      where.tags = {
        some: {
          tagId,
        },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get posts with pagination
    const posts = await this.prisma.post.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Transform the result to match the GraphQL schema
    return posts.map((post) => ({
      ...post,
      tags: post.tags?.map((pt) => pt.tag) || [],
    }));
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Transform the result to match the GraphQL schema
    return {
      ...post,
      tags: post.tags?.map((pt) => pt.tag) || [],
    };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with slug ${slug} not found`);
    }

    // Increment views
    await this.prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    // Transform the result to match the GraphQL schema
    return {
      ...post,
      views: post.views + 1,
      tags: post.tags?.map((pt) => pt.tag) || [],
    };
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const { tagIds, ...postData } = updatePostInput;

    // Check if post exists
    const existingPost = await this.prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Set publishedAt if status changes to PUBLISHED
    let publishedAt = existingPost.publishedAt;
    if (
      postData.status === PostStatus.PUBLISHED &&
      existingPost.status !== PostStatus.PUBLISHED
    ) {
      publishedAt = new Date();
    }

    // Update post
    const { categoryId, ...postDataWithoutCategory } = postData;

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        ...postDataWithoutCategory,
        publishedAt,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Handle tag updates if provided
    if (tagIds) {
      // First, delete all existing tag connections
      await this.prisma.postTag.deleteMany({
        where: { postId: id },
      });

      // Then, create new connections
      if (tagIds.length > 0) {
        await Promise.all(
          tagIds.map((tagId) =>
            this.prisma.postTag.create({
              data: {
                post: { connect: { id } },
                tag: { connect: { id: tagId } },
              },
            }),
          ),
        );
      }

      // Fetch the updated post with new tag relations
      const updatedPost = await this.prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            include: {
              profile: true,
            },
          },
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!updatedPost) {
        throw new Error(`Could not find updated post with tags for id: ${id}`);
      }

      return {
        ...updatedPost,
        tags: updatedPost.tags?.map((pt) => pt.tag) || [],
      };
    }

    // Transform the result to match the GraphQL schema
    return {
      ...post,
      tags: post.tags?.map((pt) => pt.tag) || [],
    };
  }

  async remove(id: string) {
    // Check if post exists
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Delete the post
    await this.prisma.post.delete({
      where: { id },
    });

    return true;
  }
}
