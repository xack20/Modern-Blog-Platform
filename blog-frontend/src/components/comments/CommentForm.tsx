import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_COMMENT } from '../../graphql/comments';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCommentAdded?: () => void;
  placeholder?: string;
  buttonText?: string;
}

export default function CommentForm({
  postId,
  parentId,
  onCommentAdded,
  placeholder = 'Write a comment...',
  buttonText = 'Submit',
}: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createComment] = useMutation(CREATE_COMMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await createComment({
        variables: {
          createCommentInput: {
            content,
            postId,
            ...(parentId && { parentId }),
          },
        },
      });

      setContent('');
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to post comment';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          rows={3}
          disabled={isSubmitting}
        ></textarea>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`px-4 py-2 rounded-md ${
            isSubmitting || !content.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </button>
      </div>
    </form>
  );
}
