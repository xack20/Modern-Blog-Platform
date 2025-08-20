import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type PostCardProps = {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    featuredImage?: string | null;
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
    publishedAt?: Date | string | null;
    createdAt: Date | string;
  };
};

export default function PostCard({ post }: PostCardProps) {
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  const publishedDate = post.publishedAt 
    ? new Date(post.publishedAt) 
    : new Date(post.createdAt);
  
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
      {/* Featured Image with Overlay */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        {post.featuredImage && !imageError ? (
          <>
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Image</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <Link 
              href={`/categories/${post.category.slug}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-indigo-600 hover:bg-white hover:text-indigo-700 transition-all duration-200 shadow-sm border border-white/20"
            >
              {post.category.name}
            </Link>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <Link href={`/blog/${post.slug}`} className="block group-hover:text-indigo-600 transition-colors duration-200">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3 leading-tight">
              {post.title}
            </h3>
          </Link>
          
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}
        </div>
        
        {/* Author and Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {post.author.profile?.avatar && !avatarError ? (
                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-700 shadow-sm">
                  <Image
                    src={post.author.profile.avatar}
                    alt={post.author.username}
                    fill
                    className="object-cover"
                    onError={() => setAvatarError(true)}
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-white dark:ring-gray-700">
                  {post.author.username[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {post.author.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {timeAgo}
              </p>
            </div>
          </div>
          
          {/* Read More Arrow */}
          <Link href={`/blog/${post.slug}`} className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 group">
            <span className="text-sm font-medium mr-1">Read</span>
            <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
