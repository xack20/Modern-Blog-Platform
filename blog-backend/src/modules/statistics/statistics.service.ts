import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { BlogStats, RecentActivity } from './entities/statistics.entity';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getBlogStatistics(): Promise<BlogStats> {
    // Get counts from database
    const [
      totalPosts,
      totalComments,
      totalUsers,
      totalCategories,
      totalTags,
      totalMedia,
    ] = await Promise.all([
      this.prisma.post.count(),
      this.prisma.comment.count(),
      this.prisma.user.count(),
      this.prisma.category.count(),
      this.prisma.tag.count(),
      this.prisma.media.count(),
    ]);

    // Calculate total views
    const viewsResult = await this.prisma.post.aggregate({
      _sum: {
        views: true,
      },
    });

    const totalViews = viewsResult._sum.views || 0;

    return {
      totalPosts,
      totalComments,
      totalUsers,
      totalViews,
      totalCategories,
      totalTags,
      totalMedia,
    };
  }

  async getRecentActivities(): Promise<RecentActivity[]> {
    // Get recent posts
    const recentPosts = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    // Get recent comments
    const recentComments = await this.prisma.comment.findMany({
      select: {
        id: true,
        content: true,
        status: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        post: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    // Get recent user registrations
    const recentUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    // Combine and format activities
    const activities: RecentActivity[] = [
      ...recentPosts.map((post) => ({
        id: post.id,
        type: 'post',
        title: `New post created: ${post.title}`,
        description: `Post ${post.status === 'PUBLISHED' ? 'published' : 'drafted'}`,
        createdAt: post.createdAt,
        userId: post.author.id,
        username: post.author.username,
      })),
      ...recentComments.map((comment) => ({
        id: comment.id,
        type: 'comment',
        title: `New comment on: ${comment.post.title}`,
        description:
          comment.content.substring(0, 50) +
          (comment.content.length > 50 ? '...' : ''),
        createdAt: comment.createdAt,
        userId: comment.author.id,
        username: comment.author.username,
      })),
      ...recentUsers.map((user) => ({
        id: user.id,
        type: 'user',
        title: `New user registered`,
        description: user.username,
        createdAt: user.createdAt,
        userId: user.id,
        username: user.username,
      })),
    ];

    // Sort by created date (most recent first)
    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }
}
