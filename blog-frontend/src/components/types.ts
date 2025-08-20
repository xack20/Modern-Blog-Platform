export interface ActivityType {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
  userId?: string;
  username?: string;
}

export interface BlogStatsType {
  totalPosts: number;
  totalComments: number;
  totalUsers: number;
  totalViews: number;
  totalCategories: number;
  totalTags: number;
  totalMedia: number;
}
