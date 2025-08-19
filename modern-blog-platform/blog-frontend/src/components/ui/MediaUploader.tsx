import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPLOAD_FILE } from '../graphql/media';

interface MediaUploaderProps {
  onUploadSuccess?: (mediaItem: any) => void;
  onUploadError?: (error: Error) => void;
  allowedTypes?: string[];
  maxSizeInMB?: number;
  buttonText?: string;
}

export default function MediaUploader({
  onUploadSuccess,
  onUploadError,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
  maxSizeInMB = 5,
  buttonText = 'Upload Image',
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      const error = new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      onUploadError?.(error);
      return;
    }

    // Validate file size
    if (file.size > maxSizeInBytes) {
      const error = new Error(`File too large. Maximum size: ${maxSizeInMB}MB`);
      onUploadError?.(error);
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadFile({
        variables: {
          file,
        },
      });

      if (result.data?.uploadFile) {
        onUploadSuccess?.(result.data.uploadFile);
      }
    } catch (error) {
      onUploadError?.(error as Error);
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset file input
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
        {isUploading ? 'Uploading...' : buttonText}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
          accept={allowedTypes.join(',')}
        />
      </label>
      {isUploading && (
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
      )}
    </div>
  );
}
