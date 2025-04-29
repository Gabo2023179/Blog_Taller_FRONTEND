import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFindPost } from '../../shared/hooks/useFindPost';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const { post, findPost, isLoading, error } = useFindPost();

  useEffect(() => {
    findPost(id);
  }, [findPost, id]);

  if (isLoading) return <p>Cargando publicación…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!post) return <p>No se encontró la publicación.</p>;

  return (
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="italic text-gray-600 mb-6">
        {post.course} — {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="mb-8">{post.content}</div>
      <CommentList comments={post.comments || []} />
      <CommentForm postId={id} onCommentAdded={() => findPost(id)} />
    </div>
  );
};

export default PostDetail;