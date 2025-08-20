import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import PostCard from '@/components/ui/PostCard';
import { POSTS_QUERY } from '@/graphql/posts';
import { Post } from '@/types';
import { useQuery } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const { data, loading, error } = useQuery(POSTS_QUERY, {
    variables: {
      limit: postsPerPage,
      offset: (currentPage - 1) * postsPerPage,
    },
  });

  const totalPosts = data?.posts?.length || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <Layout>
      <NextSeo
        title="Blog - Modern Blog Platform"
        description="Explore our collection of articles, tutorials, and insights"
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`}
      />
      
      <PageHeader
        title="All Stories"
        subtitle="Explore our collection of articles, tutorials, and insights from talented writers around the world"
        gradient={true}
      />
      
      <div className="relative py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Unable to load posts
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  There was an error loading the blog posts. Please try again later.
                </p>
              </div>
            </div>
          ) : data?.posts?.length ? (
            <>
              <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                {data.posts.map((post: Post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          currentPage === i + 1
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  There are no published posts yet. Check back later!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
