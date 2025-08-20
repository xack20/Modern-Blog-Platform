import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/ui/PageHeader';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & Editor-in-Chief',
      bio: 'Passionate about technology and storytelling. Believes in the power of words to change the world.',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=3b82f6&color=fff&size=200',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#',
      },
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer with a love for clean code and user experience. Building the future, one line at a time.',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff&size=200',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#',
      },
    },
    {
      name: 'Michael Rodriguez',
      role: 'Content Strategist',
      bio: 'Curator of amazing content and community builder. Connecting writers with readers worldwide.',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=ec4899&color=fff&size=200',
      social: {
        twitter: '#',
        linkedin: '#',
        github: '#',
      },
    },
  ];

  const stats = [
    { label: 'Articles Published', value: '1,000+', icon: '📝' },
    { label: 'Active Writers', value: '250+', icon: '✍️' },
    { label: 'Monthly Readers', value: '50K+', icon: '👥' },
    { label: 'Countries Reached', value: '80+', icon: '🌍' },
  ];

  return (
    <Layout>
      <NextSeo
        title="About - Modern Blog Platform"
        description="Learn about our mission, team, and the story behind Modern Blog Platform"
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`}
      />
      
      <PageHeader
        title="About Us"
        subtitle="Empowering voices, connecting minds, and building a community where stories matter"
        gradient={true}
      />
      
      <div className="relative py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Mission Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We believe that everyone has a story worth telling. Our platform provides writers with the tools they need to share their thoughts, 
              experiences, and expertise with a global audience. From emerging voices to established authors, we're building a community where 
              quality content thrives and meaningful connections are made.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Modern Blog Platform was born from a simple idea: what if there was a place where writers could focus on what they do best—writing—while 
                  technology handled the rest? In 2025, our small team of developers and content creators came together to build something different.
                </p>
                <p>
                  We noticed that many existing platforms were either too complex for new writers or too limiting for experienced ones. We wanted to create 
                  a space that grows with its users, offering powerful features without sacrificing simplicity.
                </p>
                <p>
                  Today, we're proud to host thousands of stories from writers around the world, covering everything from technology and science to art and 
                  personal experiences. Every day, new voices join our community, and every story makes us stronger.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl text-white">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Quality First
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We believe in quality over quantity. Every feature we build and every story we highlight reflects our commitment to excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The passionate individuals behind Modern Blog Platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                      >
                        <span className="text-sm font-medium">
                          {platform === 'twitter' ? '𝕏' : platform === 'linkedin' ? 'in' : 'gh'}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Community
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you're a seasoned writer or just starting your journey, we'd love to have you as part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Writing Today
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Read Our Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
