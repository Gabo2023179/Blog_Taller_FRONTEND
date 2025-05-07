import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta a tu URL real
})

// Obtiene posts, opcionalmente filtrados por curso
export const fetchPosts = async (course) => {
  const params = course ? { course } : {}
  const res = await apiClient.get('/posts', { params })
  return res.data
}

// Obtiene comentarios de un post
export const fetchComments = async (postId) => {
  const res = await apiClient.get(`/posts/${postId}/comments`)
  return res.data
}

// Envía un comentario
export const submitComment = async (postId, comment) => {
  const res = await apiClient.post(`/posts/${postId}/comments`, comment)
  return res.data
}
