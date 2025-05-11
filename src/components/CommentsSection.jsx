// src/components/CommentsSection.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchComments,
  submitComment,
  updateComment,
  deleteComment
} from '../services/api';

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const [author, setAuthor]     = useState('');
  const [content, setContent]   = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId]     = useState(null);
  const [editAuthor, setEditAuthor]   = useState('');
  const [editContent, setEditContent] = useState('');

  const loadComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchComments(postId);
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComments(list);
    } catch {
      setError('Error cargando comentarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadComments(); }, [postId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!author.trim() || !content.trim()) {
      setError('Autor y contenido son obligatorios.');
      return;
    }
    setSubmitting(true);
    try {
      const newC = await submitComment(postId, { author, content });
      setComments(cs => [...cs, newC]);
      setAuthor(''); setContent('');
    } catch {
      setError('Error enviando comentario.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async e => {
    e.preventDefault();
    try {
      const upd = await updateComment(editingId, {
        author: editAuthor,
        content: editContent
      });
      setComments(cs => cs.map(c => c._id === upd._id ? upd : c));
      setEditingId(null);
    } catch {
      alert('No se pudo editar el comentario.');
    }
  };

  if (loading) return <p className="text-gray-600 dark:text-gray-400">Cargando comentarios…</p>;

  return (
    <section className="space-y-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Comentarios</h3>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {comments.map(c => (
          <div
            key={c._id}
            className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-4 rounded-xl shadow-sm"
          >
            {editingId === c._id ? (
              <form onSubmit={handleSaveEdit} className="space-y-2">
                <input
                  value={editAuthor}
                  onChange={e => setEditAuthor(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={2}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-white rounded-lg shadow hover:opacity-90"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{c.author}</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{c.content}</p>
                </div>
                <div className="flex flex-col items-end space-y-1 text-sm">
                  <button
                    onClick={() => {
                      setEditingId(c._id);
                      setEditAuthor(c.author);
                      setEditContent(c.content);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm('¿Eliminar comentario?')) return;
                      await deleteComment(c._id);
                      setComments(cs => cs.filter(x => x._id !== c._id));
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <textarea
          rows={3}
          placeholder="Tu comentario..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2 bg-accent text-white font-medium rounded-lg shadow hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? 'Enviando…' : 'Enviar comentario'}
        </button>
      </form>
    </section>
  );
}
