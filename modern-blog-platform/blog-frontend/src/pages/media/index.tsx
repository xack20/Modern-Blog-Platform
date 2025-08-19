import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import MediaGallery from '../../components/ui/MediaGallery';
import { GET_MY_MEDIA } from '../../graphql/media';

const MediaPage: NextPage = () => {
  const router = useRouter();
  useQuery(GET_MY_MEDIA);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login?redirect=/media');
    }
  }, [router]);

  return (
    <Layout>
      <Head>
        <title>Media Gallery | Modern Blog</title>
        <meta name="description" content="Manage your media files" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Media Gallery</h1>
        <p className="text-gray-600 mb-8">
          Upload and manage your images and other media files.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <MediaGallery />
        </div>
      </div>
    </Layout>
  );
};

export default MediaPage;
