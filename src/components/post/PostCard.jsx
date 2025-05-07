import React from 'react'
import CommentsSection from '../CommentsSection'

const PostCard = ({ post }) => {
  const { _id, title, description, course, createdAt } = post
  const date = new Date(createdAt).toLocaleDateString('es-GT', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })

  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="text-sm text-gray-500 mb-4">
        <span className="mr-4">Curso: {course}</span>
        <span>Fecha: {date}</span>
      </div>
      <CommentsSection postId={_id} />
    </div>
  )
}

export default PostCard
