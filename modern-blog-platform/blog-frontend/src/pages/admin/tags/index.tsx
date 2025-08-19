import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { CREATE_TAG, DELETE_TAG, GET_TAGS, UPDATE_TAG } from '../../../graphql/tags';

interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

interface TagFormData {
  id?: string;
  name: string;
  slug: string;
  description: string;
}

const AdminTagsPage = () => {
  const [formData, setFormData] = useState<TagFormData>({
    name: '',
    slug: '',
    description: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Fetch tags data
  const { data, loading, error, refetch } = useQuery(GET_TAGS);

  // Mutations
  const [createTag, { loading: createLoading }] = useMutation(CREATE_TAG, {
    onCompleted: () => {
      resetForm();
      setMessage({ text: 'Tag created successfully!', type: 'success' });
      refetch();
      setTimeout(() => setMessage(null), 3000);
    },
    onError: (error) => {
      setMessage({ text: error.message, type: 'error' });
    },
  });

  const [updateTag, { loading: updateLoading }] = useMutation(UPDATE_TAG, {
    onCompleted: () => {
      resetForm();
      setMessage({ text: 'Tag updated successfully!', type: 'success' });
      refetch();
      setTimeout(() => setMessage(null), 3000);
    },
    onError: (error) => {
      setMessage({ text: error.message, type: 'error' });
    },
  });

  const [deleteTag] = useMutation(DELETE_TAG, {
    onCompleted: () => {
      setMessage({ text: 'Tag deleted successfully!', type: 'success' });
      refetch();
      setTimeout(() => setMessage(null), 3000);
    },
    onError: (error) => {
      setMessage({ text: error.message, type: 'error' });
    },
  });

  const isSubmitting = createLoading || updateLoading;
  const tags: Tag[] = data?.tags || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name if name field is changed and we're not in edit mode
    if (name === 'name' && !editMode) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (editMode && formData.id) {
      updateTag({
        variables: {
          id: formData.id,
          updateTagInput: {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
          },
        },
      });
    } else {
      createTag({
        variables: {
          createTagInput: {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
          },
        },
      });
    }
  };

  const handleEdit = (tag: Tag) => {
    setFormData({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      description: tag.description || '',
    });
    setEditMode(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      await deleteTag({
        variables: { id },
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
    });
    setEditMode(false);
    setErrors({});
  };

  return (
    <AdminLayout title="Manage Tags" activePage="tags">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tag Form */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editMode ? 'Edit Tag' : 'Add New Tag'}
            </h2>
            
            {message && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Slug</label>
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
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex justify-between">
                {editMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 ml-auto"
                >
                  {isSubmitting
                    ? editMode
                      ? 'Updating...'
                      : 'Creating...'
                    : editMode
                    ? 'Update Tag'
                    : 'Add Tag'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Tags List */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Tags</h2>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading tags...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                Error loading tags. Please try again.
              </div>
            ) : tags.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No tags found. Create your first tag!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posts
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tags.map((tag) => (
                      <tr key={tag.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                          {tag.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {tag.description}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tag.slug}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tag.postCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(tag)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tag.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTagsPage;
