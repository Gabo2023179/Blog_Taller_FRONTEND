import React from 'react';
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom';  // Importa Router y useRoutes
import { routes } from './routes.jsx';  // Asegúrate de que las rutas estén bien importadas
import './App.css';

export default function App() {
  // Usa useRoutes para manejar las rutas dentro del Router
  const element = useRoutes(routes);

  return (
    <Router>  /* Asegúrate de que el Router envuelva toda la aplicación */
      <div id="root">
        {/* Barra de navegación */}
        <nav className="p-4 bg-gray-100 border-b mb-6">
          <Link to="/" className="text-lg font-semibold hover:underline">
            Blog de Aprendizaje
          </Link>
        </nav>

        {/* Contenido principal */}
        <main className="container mx-auto px-4">
          {/* Aquí se renderizan las rutas definidas en el objeto `routes` */}
          {element}
        </main>
      </div>
    </Router>  /* Aquí está el Router envolviendo toda la app */
  );
}
