import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { ActivityType, BlogStatsType } from '../../components/types';
import ActivityCard from '../../components/ui/ActivityCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { BLOG_STATISTICS_QUERY, RECENT_ACTIVITIES_QUERY } from '../../graphql/statistics';
import { GET_ME } from '../../graphql/users';

const AdminDashboardPage: NextPage = () => {
  const router = useRouter();
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_ME);
  const { data: statsData, loading: statsLoading } = useQuery(BLOG_STATISTICS_QUERY);
  const { data: activitiesData, loading: activitiesLoading } = useQuery(RECENT_ACTIVITIES_QUERY);
  const [activeSection, setActiveSection] = useState('overview');

  // Check if user is authenticated and has admin privileges
  useEffect(() => {
    if (userError || (!userLoading && userData?.me?.role !== 'ADMIN' && userData?.me?.role !== 'EDITOR')) {
      router.push('/login?redirect=/admin');
    }
  }, [userData, userLoading, userError, router]);

  if (userLoading) return (
    <Layout>
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" text="Loading dashboard..." />
      </div>
    </Layout>
  );
  if (userError) return <Layout>Error: {userError.message}</Layout>;

  const user = userData?.me;
  const stats: BlogStatsType | undefined = statsData?.blogStatistics;
  const activities: ActivityType[] | undefined = activitiesData?.recentActivities;
  
  return (
    <Layout>
      <Head>
        <title>Admin Dashboard | Modern Blog</title>
        <meta name="description" content="Admin dashboard for the Modern Blog" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 bg-white shadow-md rounded-md overflow-hidden">
            <div className="p-4 bg-gray-800 text-white">
              <h2 className="font-bold">{user.username}</h2>
              <p className="text-gray-300 text-sm">{user.role}</p>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveSection('overview')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'overview'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('posts')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'posts'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Posts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('comments')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'comments'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Comments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('categories')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'categories'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Categories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('tags')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'tags'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Tags
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('users')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'users'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Users
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('media')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'media'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Media
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('settings')}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      activeSection === 'settings'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main content area */}
          <div className="flex-1 bg-white shadow-md rounded-md p-6">
            {activeSection === 'overview' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
                {statsLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner text="Loading statistics..." />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                      <h3 className="text-lg font-semibold">Total Posts</h3>
                      <p className="text-3xl font-bold">{stats?.totalPosts || 0}</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                      <h3 className="text-lg font-semibold">Total Comments</h3>
                      <p className="text-3xl font-bold">{stats?.totalComments || 0}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                      <h3 className="text-lg font-semibold">Total Users</h3>
                      <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-100 rounded-md">
                      <h3 className="text-lg font-semibold">Total Views</h3>
                      <p className="text-3xl font-bold">{stats?.totalViews || 0}</p>
                    </div>
                    <div className="p-4 bg-pink-50 border border-pink-100 rounded-md">
                      <h3 className="text-lg font-semibold">Categories</h3>
                      <p className="text-3xl font-bold">{stats?.totalCategories || 0}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-md">
                      <h3 className="text-lg font-semibold">Tags</h3>
                      <p className="text-3xl font-bold">{stats?.totalTags || 0}</p>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-md">
                      <h3 className="text-lg font-semibold">Media Items</h3>
                      <p className="text-3xl font-bold">{stats?.totalMedia || 0}</p>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  {activitiesLoading ? (
                    <div className="flex justify-center py-4">
                      <LoadingSpinner size="small" text="Loading activities..." />
                    </div>
                  ) : activities && activities.length > 0 ? (
                    <div className="space-y-4">
                      {activities.map((activity: ActivityType) => (
                        <ActivityCard key={activity.id} activity={activity} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent activities to display.</p>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Posts Management</h2>
                  <Link href="/admin/posts/new" className="px-3 py-2 bg-blue-600 text-white rounded-md">
                    New Post
                  </Link>
                </div>
                <p className="text-gray-500">Posts management section coming soon...</p>
              </div>
            )}

            {activeSection === 'comments' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Comments Management</h2>
                <p className="text-gray-500">Comments management section coming soon...</p>
              </div>
            )}

            {activeSection === 'categories' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Categories Management</h2>
                <p className="text-gray-500">Categories management section coming soon...</p>
              </div>
            )}

            {activeSection === 'tags' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Tags Management</h2>
                <p className="text-gray-500">Tags management section coming soon...</p>
              </div>
            )}

            {activeSection === 'users' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Users Management</h2>
                <p className="text-gray-500">Users management section coming soon...</p>
              </div>
            )}

            {activeSection === 'media' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Media Management</h2>
                <p className="text-gray-500">Media management section coming soon...</p>
              </div>
            )}

            {activeSection === 'settings' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Site Settings</h2>
                <p className="text-gray-500">Settings section coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
