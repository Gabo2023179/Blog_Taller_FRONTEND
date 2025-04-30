// src/routes.jsx
import NotFoundPage from './pages/notFound/NotFoundPage';  // Importación correcta por defecto
import HomePage from './pages/home/HomePage';  // Asegúrate de que esta importación sea también por defecto
import  PostPage  from './pages/post/PostPage';

export const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/post/:id',
    element: <PostPage />,
  },
  {
    path: '*',  // Ruta para manejar cualquier URL no encontrada
    element: <NotFoundPage />,  // Aquí usamos el componente importado
  },
];
