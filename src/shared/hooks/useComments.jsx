// src/hooks/useComments.jsx
import { useState, useEffect } from 'react'
import { fetchComments, submitComment } from '../services/api'

export function useComments(postId) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = () => {
    setLoading(true)
    fetchComments(postId)
      .then(data => setComments(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }

  const add = async (comment) => {
    await submitComment(postId, comment)
    load()
  }

  useEffect(load, [postId])

  return { comments, loading, error, add }
}
