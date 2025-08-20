import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import MediaGallery from '../../../components/ui/MediaGallery';
import MediaUploader from '../../../components/ui/MediaUploader';

const AdminMediaPage = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload'>('gallery');

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setActiveTab('gallery');
    }, 2000);
  };

  return (
    <AdminLayout title="Media Library" activePage="media">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-gray-500">Manage your media assets</p>
        </div>

        <div className="bg-white rounded-md shadow-sm">
          <div className="flex">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 ${
                activeTab === 'gallery'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } transition rounded-l-md`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 ${
                activeTab === 'upload'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } transition rounded-r-md`}
            >
              Upload New
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {uploadSuccess && (
          <div className="mb-6 p-4 rounded-md bg-green-100 text-green-800">
            Media uploaded successfully!
          </div>
        )}

        {activeTab === 'upload' ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Upload Media</h2>
            <MediaUploader onUploadSuccess={handleUploadSuccess} />
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Media Gallery</h2>
            <MediaGallery showUploader={false} showDeleteOption={true} viewMode="grid" />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMediaPage;
