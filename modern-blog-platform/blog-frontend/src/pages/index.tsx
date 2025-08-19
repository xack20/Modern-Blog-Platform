import Layout from '@/components/layout/Layout';
import Hero from '@/components/ui/Hero';
import PostCard from '@/components/ui/PostCard';
import { FEATURED_POSTS_QUERY } from '@/graphql/posts';
import { useQuery } from '@apollo/client';
import { NextSeo } from 'next-seo';

export default function Home() {
  const { data, loading, error } = useQuery(FEATURED_POSTS_QUERY, {
    variables: { limit: 6 },
  });

  return (
    <Layout>
      <NextSeo
        title="Modern Blog Platform - Home"
        description="A modern blog platform built with Next.js and GraphQL"
        canonical={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
      />
      
      <Hero />
      
      <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white dark:bg-gray-900 sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Posts
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
              Discover our most popular articles and stay up to date with the latest trends
            </p>
          </div>
          
          {loading ? (
            <div className="mt-12 flex justify-center">
              <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="mt-12 flex justify-center">
              <p className="text-red-500">Error loading posts.</p>
            </div>
          ) : data?.featuredPosts?.length ? (
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {data.featuredPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-12 flex justify-center">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">No featured posts yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Join Our Community
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                Share your knowledge, learn from others, and become part of our growing community of writers and readers.
              </p>
              <div className="mt-8">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="/register"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                <div className="h-64 w-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">
                    Community Image
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
