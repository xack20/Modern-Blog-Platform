import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

type AdminLayoutProps = {
  children: ReactNode;
  title: string;
  activePage?: string;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  activePage = 'dashboard',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', key: 'dashboard' },
    { name: 'Posts', href: '/admin/posts', key: 'posts' },
    { name: 'Categories', href: '/admin/categories', key: 'categories' },
    { name: 'Tags', href: '/admin/tags', key: 'tags' },
    { name: 'Comments', href: '/admin/comments', key: 'comments' },
    { name: 'Media', href: '/admin/media', key: 'media' },
    { name: 'Users', href: '/admin/users', key: 'users' },
    { name: 'Settings', href: '/admin/settings', key: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title} | Blog Admin</title>
      </Head>

      <div className="flex">
        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 transition duration-300 ease-in-out transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden bg-white shadow-xl`}
        >
          <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
            <div className="flex items-center">
              <Link href="/admin">
                <a className="text-xl font-bold text-white">Blog Admin</a>
              </Link>
            </div>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="h-0 flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link href={item.href} key={item.key}>
                  <a
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      activePage === item.key
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 bg-white shadow-lg">
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
                <Link href="/admin">
                  <a className="text-xl font-bold text-white">Blog Admin</a>
                </Link>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.key}>
                      <a
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          activePage === item.key
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
            <button
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex items-center">
                <h1 className="text-lg font-semibold">{title}</h1>
              </div>
            </div>
          </div>

          <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
