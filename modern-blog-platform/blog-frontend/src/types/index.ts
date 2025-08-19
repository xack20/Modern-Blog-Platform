export interface Media {
  id: string;
  url: string;
  filename: string;
  type: string;
  size: number;
  createdAt: string;
}

export interface UserProfile {
  avatar?: string | null;
  displayName?: string;
  bio?: string;
  website?: string;
  location?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  profile?: UserProfile | null;
  postsCount?: number;
  commentsCount?: number;
  lastLoginAt?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  author: {
    id: string;
    username: string;
    name: string;
    profile?: {
      avatar?: string | null;
    } | null;
  };
  post?: {
    id: string;
    title: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featuredImage?: string | null;
  slug: string;
  author: {
    username: string;
    profile?: {
      avatar?: string | null;
    } | null;
  };
  category?: {
    name: string;
    slug: string;
  } | null;
  categories: Category[];
  tags: Tag[];
  comments: Comment[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}
