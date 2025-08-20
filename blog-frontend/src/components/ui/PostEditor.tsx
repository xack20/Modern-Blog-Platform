import { useMutation, useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { GET_CATEGORIES } from '../../graphql/categories';
import { CREATE_POST_MUTATION, POST_QUERY, UPDATE_POST_MUTATION } from '../../graphql/posts';
import { GET_TAGS } from '../../graphql/tags';
import { Category, Media, Post, Tag } from '../../types';
import MediaGallery from './MediaGallery';

// Import the editor dynamically with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  seoTitle: string;
  seoDescription: string;
  categoryId: string;
  tagIds: string[];
}

interface PostEditorProps {
  postId?: string;
  initialData?: Post;
}

const PostEditor: React.FC<PostEditorProps> = ({ postId, initialData }) => {
  const router = useRouter();
  const isEditMode = !!postId;
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'DRAFT',
    seoTitle: '',
    seoDescription: '',
    categoryId: '',
    tagIds: [],
  });

  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Queries and mutations
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: tagsData } = useQuery(GET_TAGS);
  const { data: postData } = useQuery(POST_QUERY, {
    variables: { id: postId },
    skip: !isEditMode,
  });

  const [createPost, { loading: createLoading }] = useMutation(CREATE_POST_MUTATION);
  const [updatePost, { loading: updateLoading }] = useMutation(UPDATE_POST_MUTATION);

  const isSubmitting = createLoading || updateLoading;

  // Populate form with post data when editing
  useEffect(() => {
    if (isEditMode && postData?.post) {
      const { post } = postData;
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        featuredImage: post.featuredImage || '',
        status: post.status || 'DRAFT',
        seoTitle: post.seoTitle || '',
        seoDescription: post.seoDescription || '',
        categoryId: post.categoryId || '',
        tagIds: post.tags?.map((tag: Tag) => tag.id) || [],
      });
    } else if (initialData) {
      setFormData((prev) => ({
        ...prev,
        title: initialData.title,
        content: initialData.content,
        excerpt: initialData.excerpt || '',
        status: initialData.status,
        featuredImage: initialData.featuredImage || '',
        categoryId: initialData.categories[0]?.id || '',
        tagIds: initialData.tags.map(tag => tag.id),
        slug: initialData.slug || '',
        seoTitle: initialData.seoTitle || '',
        seoDescription: initialData.seoDescription || '',
      }));
    }
  }, [isEditMode, postData, initialData]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: prev.slug || generateSlug(newTitle),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      tagIds: checked
        ? [...prev.tagIds, value]
        : prev.tagIds.filter((id) => id !== value),
    }));
  };

  const handleMediaSelect = (media: Media) => {
    setFormData((prev) => ({
      ...prev,
      featuredImage: media.url,
    }));
    setShowMediaSelector(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isEditMode) {
        await updatePost({
          variables: {
            id: postId,
            updatePostInput: {
              ...formData,
              tagIds: formData.tagIds.length ? formData.tagIds : undefined,
              categoryId: formData.categoryId || undefined,
            },
          },
        });
        
        setMessage({ text: 'Post updated successfully!', type: 'success' });
        setTimeout(() => router.push(`/admin/posts`), 2000);
      } else {
        await createPost({
          variables: {
            createPostInput: {
              ...formData,
              tagIds: formData.tagIds.length ? formData.tagIds : undefined,
              categoryId: formData.categoryId || undefined,
            },
          },
        });
        
        setMessage({ text: 'Post created successfully!', type: 'success' });
        setTimeout(() => router.push(`/admin/posts`), 2000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  // Editor modules/formats configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              className={`w-full p-2 border rounded-md ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md ${
                errors.slug ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          {typeof window !== 'undefined' && (
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              modules={modules}
              className={`bg-white ${errors.content ? 'border-red-500' : ''}`}
            />
          )}
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Brief summary of the post..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Featured Image</label>
          <div className="flex flex-col md:flex-row gap-4">
            {formData.featuredImage && (
              <div className="w-full md:w-1/3 mb-2">
                <Image
                  src={formData.featuredImage}
                  alt="Featured"
                  width={800}
                  height={400}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex-1">
              <input
                type="text"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                placeholder="Image URL"
              />
              <button
                type="button"
                onClick={() => setShowMediaSelector(!showMediaSelector)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                {showMediaSelector ? 'Hide Media Gallery' : 'Choose from Media Gallery'}
              </button>
            </div>
          </div>

          {showMediaSelector && (
            <div className="mt-4 border border-gray-200 rounded-md p-4">
              <MediaGallery onSelect={handleMediaSelect} showUploader={true} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Category --</option>
              {categoriesData?.categories?.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {tagsData?.tags?.map((tag: Tag) => (
              <div key={tag.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  value={tag.id}
                  checked={formData.tagIds.includes(tag.id)}
                  onChange={handleTagChange}
                  className="mr-2"
                />
                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium">SEO Title</label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="SEO optimized title (optional)"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">SEO Description</label>
            <input
              type="text"
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="SEO meta description (optional)"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/posts')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
              ? 'Update Post'
              : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
