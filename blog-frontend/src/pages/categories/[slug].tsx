import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import PostCard from '@/components/ui/PostCard';
import { GET_CATEGORY } from '@/graphql/categories';
import { Post } from '@/types';
import { useQuery } from '@apollo/client';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { slug },
    skip: !slug,
  });

  const category = data?.category;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading category...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !category) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Category Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The category you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <NextSeo
        title={`${category.name} - Modern Blog Platform`}
        description={category.description || `Explore articles in the ${category.name} category`}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/categories/${category.slug}`}
      />
      
      <PageHeader
        title={category.name}
        subtitle={category.description || `Discover amazing articles about ${category.name}`}
        gradient={true}
      />
      
      <div className="relative py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {category.posts && category.posts.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
              {category.posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No articles yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This category doesn&apos;t have any published articles yet. Check back later!
                </p>
                <button
                  onClick={() => router.push('/categories')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  Browse Other Categories
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
