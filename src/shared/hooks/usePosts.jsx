// src/hooks/usePosts.jsx
import { useState, useEffect } from 'react'
import { fetchPosts } from '../services/api'

export function usePosts(course) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetchPosts(course)
      .then(data => isMounted && setPosts(data))
      .catch(err => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false))
    return () => { isMounted = false }
  }, [course])

  return { posts, loading, error }
}
