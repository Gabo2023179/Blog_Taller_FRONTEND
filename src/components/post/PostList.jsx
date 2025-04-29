import React, { useEffect } from 'react';
import PostCard from './PostCard';
import { useListPosts } from '../../shared/hooks/useListPosts';

const PostList = () => {
  const { posts, loadPosts, isLoading, error } = useListPosts();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (isLoading) return <p>Cargando publicaciones…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (posts.length === 0) return <p>No hay publicaciones.</p>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;