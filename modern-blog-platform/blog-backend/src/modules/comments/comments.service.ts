import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CommentsFilterInput } from './dto/comments-filter.input';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, createCommentInput: CreateCommentInput) {
    const { postId, parentId, content } = createCommentInput;

    // Check if post exists
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Check if parent comment exists if provided
    if (parentId) {
      const parentComment = await this.prisma.comment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment) {
        throw new NotFoundException(
          `Parent comment with ID ${parentId} not found`,
        );
      }

      // Make sure the parent comment belongs to the same post
      if (parentComment.postId !== postId) {
        throw new NotFoundException(
          `Parent comment does not belong to the specified post`,
        );
      }
    }

    // Create the comment
    return this.prisma.comment.create({
      data: {
        content,
        status: CommentStatus.PENDING,
        author: {
          connect: { id: authorId },
        },
        post: {
          connect: { id: postId },
        },
        ...(parentId && {
          parent: {
            connect: { id: parentId },
          },
        }),
      },
      include: {
        author: true,
        post: true,
        parent: true,
      },
    });
  }

  async findAll(filters: CommentsFilterInput = {}) {
    const {
      searchTerm,
      userId,
      postId,
      status,
      take = 20,
      skip = 0,
      onlyRootComments = false,
    } = filters;

    // Build where conditions
    const where: Prisma.CommentWhereInput = {};

    if (searchTerm) {
      where.content = {
        contains: searchTerm,
        mode: 'insensitive',
      };
    }

    if (userId) {
      where.authorId = userId;
    }

    if (postId) {
      where.postId = postId;
    }

    if (status) {
      where.status = status;
    }

    if (onlyRootComments) {
      where.parentId = null;
    }

    // Get comments
    const [comments, totalCount] = await Promise.all([
      this.prisma.comment.findMany({
        where,
        include: {
          author: true,
          post: true,
          parent: true,
          replies: {
            include: {
              author: true,
              replies: {
                include: {
                  author: true,
                },
              },
            },
            where: status ? { status } : {},
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      this.prisma.comment.count({ where }),
    ]);

    return {
      comments,
      totalCount,
      hasMore: skip + take < totalCount,
    };
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: true,
        post: true,
        parent: true,
        replies: {
          include: {
            author: true,
            replies: {
              include: {
                author: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: string, updateCommentInput: UpdateCommentInput) {
    // Check if comment exists
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.prisma.comment.update({
      where: { id },
      data: {
        ...(updateCommentInput.content && {
          content: updateCommentInput.content,
        }),
        ...(updateCommentInput.status && { status: updateCommentInput.status }),
      },
      include: {
        author: true,
        post: true,
        parent: true,
      },
    });
  }

  async remove(id: string) {
    // Check if comment exists
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        replies: true,
      },
    });

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // If comment has replies, just mark it as deleted
    if (existingComment.replies.length > 0) {
      return this.prisma.comment.update({
        where: { id },
        data: {
          content: '[Comment deleted]',
          status: CommentStatus.REJECTED,
        },
        include: {
          author: true,
          post: true,
          parent: true,
        },
      });
    }

    // Otherwise, actually delete it
    return this.prisma.comment.delete({
      where: { id },
      include: {
        author: true,
        post: true,
        parent: true,
      },
    });
  }

  async getCommentsByPostId(postId: string, status?: CommentStatus) {
    return this.prisma.comment.findMany({
      where: {
        postId,
        ...(status && { status }),
        parentId: null, // Get only root comments
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
            replies: {
              include: {
                author: true,
              },
            },
          },
          where: status ? { status } : {},
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCommentsByUserId(userId: string) {
    return this.prisma.comment.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
        post: true,
        parent: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveComment(id: string) {
    return this.prisma.comment.update({
      where: { id },
      data: { status: CommentStatus.APPROVED },
      include: {
        author: true,
        post: true,
        parent: true,
      },
    });
  }

  async rejectComment(id: string) {
    return this.prisma.comment.update({
      where: { id },
      data: { status: CommentStatus.REJECTED },
      include: {
        author: true,
        post: true,
        parent: true,
      },
    });
  }
}
