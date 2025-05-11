// src/components/post/DeletePostButton.jsx
import React from 'react'
import { deletePost } from '../services/api'

export default function DeletePostButton({ postId, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar esta publicación?')) return
    try {
      await deletePost(postId)
      onDeleted(postId)
    } catch (err) {
      console.error(err)
      alert('No se pudo eliminar la publicación.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:underline text-sm"
    >
      Eliminar Post
    </button>
  )
}
