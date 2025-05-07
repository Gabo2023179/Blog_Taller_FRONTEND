import React, { useState, useEffect } from 'react'
import CourseFilter from '../CourseFilter'
import { fetchPosts } from '../../services/api'
import PostCard from './PostCard'

// Skeleton para cuando carga
function SkeletonPostCard() {
  return (
    <div className="border rounded-lg p-4 shadow animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  )
}

export default function PostList() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchPosts(selectedCourse)
        setPosts(data)
      } catch (err) {
        console.error('Error cargando posts', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [selectedCourse])

  return (
    <div className="space-y-6">
      {/* Filtro “pill” */}
      <CourseFilter selectedCourse={selectedCourse} onChange={setSelectedCourse} />

      {/* Contenido */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <SkeletonPostCard key={i} />)}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map(p => <PostCard key={p._id} post={p} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No hay publicaciones para este curso.
        </p>
      )}
    </div>
  )
}
