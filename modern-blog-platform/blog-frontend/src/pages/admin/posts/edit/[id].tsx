import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/layout/AdminLayout';
import PostEditor from '../../../../components/ui/PostEditor';

const EditPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  return (
    <AdminLayout title="Edit Post" activePage="posts">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <p className="text-gray-500">Make changes to your post</p>
      </div>
      
      {/* Only render PostEditor when id is available */}
      {id && typeof id === 'string' && (
        <PostEditor postId={id} />
      )}
    </AdminLayout>
  );
};

export default EditPostPage;
