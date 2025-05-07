import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../services/api'
import { Link } from 'react-router-dom'

export default function FeaturedPost() {
  const [post, setPost] = useState(null)

  useEffect(() => {
    const load = async () => {
      const all = await fetchPosts()
      if (all.length) setPost(all[0])  // la más reciente
    }
    load()
  }, [])

  if (!post) return null

  const date = new Date(post.createdAt).toLocaleDateString('es-GT', {
    day: '2-digit', month: 'short', year: 'numeric'
  })

  return (
    <Link to={`/posts/${post._id}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition">
        <img
          src={post.imageUrl || '/default-cover.jpg'}
          alt={post.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-3xl font-bold mb-1">{post.title}</h2>
          <p className="text-sm">{post.course} • {date}</p>
        </div>
      </div>
    </Link>
  )
}
