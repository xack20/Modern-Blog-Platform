import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { BlogStats, RecentActivity, StatisticsService } from '.';
import { Roles } from '../../common/decorators/roles.decorator';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver()
export class StatisticsResolver {
  constructor(private statisticsService: StatisticsService) {}

  @Query(() => BlogStats)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async blogStatistics(): Promise<BlogStats> {
    return await this.statisticsService.getBlogStatistics();
  }

  @Query(() => [RecentActivity])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async recentActivities(): Promise<RecentActivity[]> {
    return await this.statisticsService.getRecentActivities();
  }
}
