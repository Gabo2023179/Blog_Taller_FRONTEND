import { useState, useCallback } from 'react';
import { addComment } from '../services/api';

export const useAddComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCommentHook = useCallback(async (postId, comment) => {
    setIsLoading(true);
    setError(null);
    try {
      return await addComment(postId, comment);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { addComment: addCommentHook, isLoading, error };
};