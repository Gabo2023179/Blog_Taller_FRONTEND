import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <div className="post-card p-4 rounded-lg shadow-md">
    <Link to={`/posts/${post._id}`}>  
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
    </Link>
    <p className="text-sm italic text-gray-600 mb-2">
      {post.course} — {new Date(post.createdAt).toLocaleDateString()}
    </p>
    <p className="text-base">
      {post.content.slice(0, 150)}{post.content.length > 150 && '...'}
    </p>
  </div>
);

export default PostCard;