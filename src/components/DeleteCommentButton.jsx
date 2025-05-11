// src/components/comment/DeleteCommentButton.jsx
import React from 'react'
import { deleteComment } from '../services/api'

export default function DeleteCommentButton({ commentId, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm('¿Deseas eliminar este comentario?')) return
    try {
      await deleteComment(commentId)
      onDeleted()
    } catch (err) {
      console.error(err)
      alert('No se pudo eliminar el comentario.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:underline text-sm ml-4"
    >
      Eliminar
    </button>
  )
}
