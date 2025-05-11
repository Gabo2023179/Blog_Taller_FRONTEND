// src/components/post/PostCard.jsx
import React, { useState } from 'react';
import { deletePost, updatePost } from '../../services/api';
import CommentsSection from '../CommentsSection';

export default function PostCard({ post, onDelete, onUpdate }) {
  const { _id, title, content, course, createdAt } = post;

  // estados de edición
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ title, content, course });

  // estado de toggle de comentarios
  const [showComments, setShowComments] = useState(false);

  // formatear fecha
  const formattedDate = new Date(createdAt).toLocaleDateString('es-GT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // manejar cambios en el form de edición
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // guardar edición
  const handleSave = async e => {
    e.preventDefault();
    try {
      const updated = await updatePost(_id, formData);
      onUpdate(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Error actualizando publicación.');
    }
  };

  // confirmar y eliminar (ahora usa deletePost)
  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar esta publicación?')) return;
    try {
      await deletePost(_id);
      onDelete(_id);
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar la publicación.');
    }
  };

  // Vista de edición
  if (editing) {
    return (
      <form
        onSubmit={handleSave}
        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow space-y-4"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-gray-700 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Título"
        />
        <textarea
          name="content"
          rows={3}
          value={formData.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-gray-700 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Contenido"
        />
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md bg-gray-700 dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="Taller">Taller</option>
          <option value="Práctica Supervisada">Práctica Supervisada</option>
          <option value="Tecnología">Tecnología</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  // Vista normal con toggle de comentarios
  return (
    <div className="bg-white dark:bg-gray-800 border rounded-2xl p-6 shadow space-y-4">
      {/* header: título, fecha y acciones */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <span className="text-sm text-secondary dark:text-secondary/80">{formattedDate}</span>
        </div>
        <div className="flex gap-4 text-sm">
          <button onClick={() => setEditing(true)} className="text-blue-600 hover:underline">
            Editar
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:underline">
            Eliminar
          </button>
        </div>
      </div>

      {/* contenido y badge */}
      <p className="text-gray-700 dark:text-gray-300">{content}</p>
      <div className="flex justify-between items-center">
        <span className="px-2 py-1 bg-accent/10 dark:bg-accent/20 text-accent rounded-full">
          {course}
        </span>
        <button
          onClick={() => setShowComments(v => !v)}
          className="text-accent hover:underline focus:outline-none"
        >
          {showComments ? 'Ocultar comentarios' : 'Ver comentarios'}
        </button>
      </div>

      {/* sección de comentarios */}
      {showComments && <CommentsSection postId={_id} />}
    </div>
  );
}
