import React, { useState, useEffect } from 'react'
import { fetchComments, submitComment } from '../services/api'

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const loadComments = async () => {
    setLoading(true)
    try {
      const data = await fetchComments(postId)
      setComments(data)
    } catch (err) {
      console.error('Error cargando comentarios', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadComments()
  }, [postId])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    setSubmitting(true)
    try {
      await submitComment(postId, { name, content })
      setName('')
      setContent('')
      loadComments()
    } catch (err) {
      console.error('Error enviando comentario', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Comentarios</h3>
      {loading
        ? <p>Cargando comentarios...</p>
        : comments.map(c => (
            <div key={c._id} className="border-t pt-2 mb-2">
              <p className="text-sm">
                <span className="font-semibold">{c.name}</span>{' '}
                <span className="text-gray-500 text-xs">
                  ({new Date(c.createdAt).toLocaleString('es-GT')})
                </span>
              </p>
              <p className="text-gray-700">{c.content}</p>
            </div>
          ))
      }
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Tu nombre"
          className="border rounded px-2 py-1 w-full mb-2"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          placeholder="Tu comentario"
          className="border rounded px-2 py-1 w-full mb-2"
          rows="3"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded disabled:opacity-50"
        >
          {submitting ? 'Enviando...' : 'Enviar comentario'}
        </button>
      </form>
    </div>
  )
}

export default CommentsSection
