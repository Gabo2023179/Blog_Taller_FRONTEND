import { useState, useCallback } from 'react';
import { listPosts } from '../services/api';

export const useListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listPosts();
      setPosts(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { posts, loadPosts, isLoading, error };
};