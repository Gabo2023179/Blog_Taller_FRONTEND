import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import HeaderTitle from '../components/HeaderTitle';
import Section from '../components/Section';
import PostList from '../components/post/PostList';
import AddPostForm from '../components/post/AddPostForm';
import Footer from '../components/footer/Footer';
import { fetchPosts } from '../services/api';

export default function HomePage() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error cargando posts:', err);
        setError('No se pudieron cargar las publicaciones.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handlePostDeleted = deletedId =>
    setPosts(prev => prev.filter(p => p._id !== deletedId));

  const handlePostUpdated = updated =>
    setPosts(prev => prev.map(p => (p._id === updated._id ? updated : p)));

  if (loading) return <p className="text-center mt-12">Cargando publicaciones…</p>;
  if (error)   return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 antialiased">
        <HeaderTitle
          title="Blog de Aprendizaje"
          subtitle="Explora mis proyectos y actividades organizadas por curso"
        />

        <Section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Publicaciones
          </h2>
          <PostList
            posts={posts}
            onDelete={handlePostDeleted}
            onUpdate={handlePostUpdated}
          />
        </Section>

        <Section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Agregar Publicación
          </h2>
          <AddPostForm />
        </Section>
      </main>
      <Footer />
    </>
  );
}
