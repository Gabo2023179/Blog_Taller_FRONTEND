import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/post/PostList';
import PostDetail from './components/post/PostDetail';
import './App.css';  // Importa el archivo CSS mejorado

export default function App() {
  return (
    <Router>
      <div id="root">
        <nav className="p-4 bg-gray-100 border-b mb-6">
          <Link to="/" className="text-lg font-semibold hover:underline">
            Blog de Aprendizaje
          </Link>
        </nav>
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}