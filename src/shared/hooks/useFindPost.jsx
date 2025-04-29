import { useState, useCallback } from 'react';
import { findPostById } from '../../services/api'

export const useFindPost = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const findPost = useCallback(async id => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await findPostById(id);
      setPost(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { post, findPost, isLoading, error };
};      