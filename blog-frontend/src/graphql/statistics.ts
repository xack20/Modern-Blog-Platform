import { gql } from "@apollo/client";

export const BLOG_STATISTICS_QUERY = gql`
  query BlogStatistics {
    blogStatistics {
      totalPosts
      totalComments
      totalUsers
      totalViews
      totalCategories
      totalTags
      totalMedia
    }
  }
`;

export const RECENT_ACTIVITIES_QUERY = gql`
  query RecentActivities {
    recentActivities {
      id
      type
      title
      description
      createdAt
      userId
      username
    }
  }
`;
