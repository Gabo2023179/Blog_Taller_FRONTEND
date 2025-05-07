import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-accent white dark:text-white">
          🚀 Aprendizaje
        </Link>
        <button className="md:hidden ml-4 text-gray-700 dark:text-gray-300">
          {/* ícono “hamburger” */}
          <i className="bi bi-list text-2xl"></i>
        </button>
      </div>
    </nav>
  )
}
