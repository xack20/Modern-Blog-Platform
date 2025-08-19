import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

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
  const publishedDate = post.publishedAt 
    ? new Date(post.publishedAt) 
    : new Date(post.createdAt);
  
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        {post.featuredImage ? (
          <div className="relative h-48 w-full">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="bg-indigo-100 dark:bg-indigo-900 h-48 w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6 dark:bg-gray-800">
        <div className="flex-1">
          {post.category && (
            <Link 
              href={`/categories/${post.category.slug}`}
              className="text-xs font-medium uppercase text-indigo-600 dark:text-indigo-400"
            >
              {post.category.name}
            </Link>
          )}
          <Link href={`/blog/${post.slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</p>
            {post.excerpt && (
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            {post.author.profile?.avatar ? (
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.profile.avatar}
                  alt={post.author.username}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <span className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                {post.author.username[0].toUpperCase()}
              </span>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author.username}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={publishedDate.toISOString()}>{timeAgo}</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
