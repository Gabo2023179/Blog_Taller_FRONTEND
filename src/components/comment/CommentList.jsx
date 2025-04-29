import React from 'react';

const CommentList = ({ comments }) => (
  <div className="mt-6">
    <h3 className="text-lg font-medium mb-2">Comentarios</h3>
    {comments.length === 0 ? (
      <p>No hay comentarios.</p>
    ) : (
      <ul className="space-y-4">
        {comments.map(c => (
          <li key={c._id} className="p-3 border rounded-md">
            <p className="font-semibold">{c.author}</p>
            <p className="text-sm italic text-gray-500">
              {new Date(c.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-1">{c.content}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CommentList;