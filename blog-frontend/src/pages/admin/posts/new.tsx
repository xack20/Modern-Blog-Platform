import AdminLayout from '../../../components/layout/AdminLayout';
import PostEditor from '../../../components/ui/PostEditor';

const NewPostPage = () => {
  return (
    <AdminLayout title="Create New Post" activePage="posts">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        <p className="text-gray-500">Write a new blog post</p>
      </div>
      
      <PostEditor />
    </AdminLayout>
  );
};

export default NewPostPage;
