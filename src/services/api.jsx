// src/services/api.jsx
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/Blog/v1',
  timeout: 5000,
});

// ——— Publicaciones ———

// Obtener lista de posts (opcionalmente filtrados por curso)
export const fetchPosts = async (course) => {
  const params = course ? { course } : {};
  const res = await apiClient.get('/posts', { params });
  // res.data === { success: true, posts: [ … ] }
  return res.data.posts;
};

// Crear nuevo post
export const createPost = async (postData) => {
  const res = await apiClient.post('/posts', postData);
  // res.data === { success: true, post: { … } }
  return res.data.post;
};

// Actualizar post existente
export const updatePost = async (postId, data) => {
  const res = await apiClient.put(`/posts/${postId}`, data);
  // res.data === { success: true, post: { … } }
  return res.data.post;
};

// Eliminar post
export const deletePost = async (postId) => {
  await apiClient.delete(`/posts/${postId}`);
};

// ——— Comentarios ———

// Obtener comentarios de un post
export const fetchComments = async (postId) => {
  const res = await apiClient.get(`/posts/${postId}/comments`);
  // si el backend devuelve un array plano, lo devolvemos
  if (Array.isArray(res.data)) return res.data;
  // o bien busca en res.data.comments
  return res.data.comments || [];
};

// Crear nuevo comentario
export const submitComment = async (postId, comment) => {
  const res = await apiClient.post(`/posts/${postId}/comments`, comment);
  // aquí el backend devuelve directamente el objeto Comment
  return res.data;
};

// Actualizar comentario existente
export const updateComment = async (commentId, data) => {
  const res = await apiClient.put(`/comments/${commentId}`, data);
  // res.data === { success: true, comment: { … } }
  return res.data.comment;
};

// Eliminar comentario
export const deleteComment = async (commentId) => {
  const res = await apiClient.delete(`/comments/${commentId}`);
  // ahora res.data tiene { success: boolean, message: string }
  return res.data;
};
