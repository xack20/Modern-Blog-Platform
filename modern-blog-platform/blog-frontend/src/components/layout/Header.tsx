import { ME_QUERY } from '@/graphql/auth';
import { useQuery } from '@apollo/client';
import { Menu, Moon, Search, Sun, User, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { data } = useQuery(ME_QUERY);

  const navigation = [
    // { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-shrink-0 items-center">
              <Link 
                href="/" 
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              >
                Modern Blog
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    router.pathname === item.href
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {router.pathname !== item.href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center space-x-3">
            <button
              onClick={() => router.push('/search')}
              className="p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-110 transform border border-white/20"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 hover:scale-110 transform border border-white/20"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {data?.me ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white bg-white/10 dark:bg-white/10 backdrop-blur-sm rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 transition-all duration-300 border border-white/20"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:text-white transition-all duration-300 hover:scale-110 transform border border-white/20"
                >
                  <User className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-white bg-white/10 dark:bg-white/10 backdrop-blur-sm rounded-lg hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 transition-all duration-300 border border-white/20"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 border border-blue-500/20"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200/20 dark:border-gray-700/20">
          <div className="space-y-2 px-4 py-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  router.pathname === item.href
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              {data?.me ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:text-white rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 hover:text-white rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
