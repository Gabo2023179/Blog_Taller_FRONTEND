import React, { useState } from 'react';
import { useAddComment } from '../hooks/useAddComment';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [form, setForm] = useState({ author: '', content: '' });
  const { addComment, isLoading, error } = useAddComment();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.author.trim() || !form.content.trim()) {
      return alert('Por favor completa todos los campos');
    }
    try {
      await addComment(postId, form);
      setForm({ author: '', content: '' });
      onCommentAdded();
    } catch {}
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Agregar Comentario</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Tu nombre"
          className="w-full p-2 border rounded-md"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Tu comentario"
          className="w-full p-2 border rounded-md h-24"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-md shadow hover:bg-gray-100"
        >
          {isLoading ? 'Enviando…' : 'Enviar'}
        </button>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default CommentForm;
