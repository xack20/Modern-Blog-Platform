import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="relative pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Modern Blog Platform</span>
              <span className="block text-indigo-600 dark:text-indigo-400">Insights &amp; Stories</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Discover the latest articles, tutorials, and insights from our community of writers and experts.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/blog"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Read Blog
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700 md:py-4 md:px-10 md:text-lg"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
