import { useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useState } from 'react';
import { DELETE_MEDIA, GET_MY_MEDIA } from '../../graphql/media';
import MediaUploader from './MediaUploader';

interface Media {
  id: string;
  url: string;
  filename: string;
  type: string;
  size: number;
  createdAt: string;
}

interface MediaGalleryProps {
  onSelect?: (media: Media) => void;
  onDelete?: (mediaId: string) => void;
  selectable?: boolean;
  showUploader?: boolean;
  showDeleteOption?: boolean;
  viewMode?: 'grid' | 'list';
}

export default function MediaGallery({
  onSelect,
  onDelete,
  selectable = true,
  showUploader = true,
  showDeleteOption = false,
  viewMode = 'grid',
}: MediaGalleryProps) {
  const { data, loading, error, refetch } = useQuery(GET_MY_MEDIA);
  const [deleteMedia] = useMutation(DELETE_MEDIA);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handleSelect = (media: Media) => {
    if (!selectable) return;
    setSelectedMedia(media.id);
    onSelect?.(media);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia({
        variables: { id },
      });
      onDelete?.(id);
      refetch();
    } catch (err) {
      console.error('Error deleting media:', err);
    }
  };

  const handleUploadSuccess = () => {
    refetch();
  };

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error);
  };

  if (loading) return <p>Loading media...</p>;
  if (error) return <p>Error loading media: {error.message}</p>;

  const media = data?.myMedia || [];

  return (
    <div className="space-y-4">
      {showUploader && (
        <div className="mb-4">
          <MediaUploader
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        </div>
      )}

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No media found</p>
          ) : (
            media.map((item: Media) => (
              <div
                key={item.id}
                className={`relative border rounded-md overflow-hidden ${
                  selectedMedia === item.id ? 'ring-2 ring-blue-500' : ''
                } ${selectable ? 'cursor-pointer' : ''}`}
                onClick={() => handleSelect(item)}
              >
                {item.type.startsWith('image/') ? (
                  <Image
                    src={item.url}
                    alt={item.filename}
                    width={150}
                    height={128}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 bg-gray-100">
                    <span className="text-sm text-gray-500">{item.type}</span>
                  </div>
                )}
                <div className="p-2 text-xs truncate">{item.filename}</div>
                {showDeleteOption && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          {media.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No media found</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Media</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Filename</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {media.map((item: Media) => (
                  <tr key={item.id} className={selectable ? 'cursor-pointer hover:bg-gray-50' : ''} onClick={() => handleSelect(item)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.type.startsWith('image/') ? (
                        <Image src={item.url} alt={item.filename} width={40} height={40} className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">File</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.filename}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round(item.size / 1024)} KB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {showDeleteOption && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
