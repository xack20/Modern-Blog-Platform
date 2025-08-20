import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useState } from 'react';
import { GET_POST_COMMENTS } from '../../graphql/comments';
import CommentForm from './CommentForm';

interface CommentListProps {
  postId: string;
}

interface Author {
  id: string;
  username: string;
  profile?: {
    avatar?: string;
  };
}

interface Comment {
  id: string;
  content: string;
  status: string;
  author: Author;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
}

export default function CommentList({ postId }: CommentListProps) {
  const { data, loading, error, refetch } = useQuery(GET_POST_COMMENTS, {
    variables: { postId },
  });
  
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleCommentAdded = () => {
    refetch();
    setReplyingTo(null);
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error.message}</p>;

  const comments = data?.publicComments || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderAvatar = (author: Author) => {
    const avatarUrl = author.profile?.avatar || '/default-avatar.png';
    return (
      <div className="flex-shrink-0">
        <Image
          src={avatarUrl}
          alt={author.username}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    );
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12 mt-3' : 'mt-6'}`}>
      <div className="flex gap-3">
        {renderAvatar(comment.author)}
        <div className="flex-1">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{comment.author.username}</span>
              <span className="text-xs text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-gray-800 whitespace-pre-line">{comment.content}</p>
          </div>
          <div className="mt-1">
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {replyingTo === comment.id ? 'Cancel Reply' : 'Reply'}
            </button>
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                onCommentAdded={handleCommentAdded}
                placeholder={`Reply to ${comment.author.username}...`}
                buttonText="Post Reply"
              />
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">Comments ({comments.length})</h3>
      
      <div className="mb-8">
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </div>

      <div className="space-y-2">
        {comments.length === 0 ? (
          <p className="text-gray-500">Be the first to comment on this post!</p>
        ) : (
          comments.map((comment: Comment) => renderComment(comment))
        )}
      </div>
    </div>
  );
}
