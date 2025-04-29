import axios from 'axios';

// Configura tu URL base en .env: VITE_API_BASE_URL=http://localhost:3001/kinalCast/v2
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/kinalCast/v1',
  timeout: 5000,
});

// Interceptor para añadir token de autenticación
apiClient.interceptors.request.use(
  config => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const { token } = JSON.parse(stored);
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn('Token inválido en localStorage', err);
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejo global de errores (p.ej. 401)
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      // opcional: redirigir a login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funciones de servicio
export const listPosts = () =>
  apiClient.get('/posts').then(res => res.data);

export const findPostById = id =>
  apiClient.get(`/posts/${id}`).then(res => res.data);

export const addComment = (postId, comment) =>
  apiClient.post(`/posts/${postId}/comments`, comment).then(res => res.data);
