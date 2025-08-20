import Layout from '@/components/layout/Layout';
import Hero from '@/components/ui/Hero';
import PostCard from '@/components/ui/PostCard';
import { FEATURED_POSTS_QUERY } from '@/graphql/posts';
import { Post } from '@/types';
import { useQuery } from '@apollo/client';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

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
      
      <div className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Featured Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover compelling narratives, insights, and perspectives from our 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-medium"> talented community</span> of writers
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
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
              {data.featuredPosts.map((post: Post) => (
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
      
      <div className="relative py-20 sm:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Join Our Creative
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-white">Community</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Connect with passionate writers, share your unique perspective, and discover stories that inspire. 
                  Our platform empowers creators to reach engaged audiences who value quality content.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
                  <div className="text-gray-600 dark:text-gray-300">Active Writers</div>
                </div>
                <div className="text-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">50K+</div>
                  <div className="text-gray-600 dark:text-gray-300">Monthly Readers</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Start Writing Today
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-300"
                >
                  Explore Stories
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          Growing Community
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Writers and readers from around the world
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
