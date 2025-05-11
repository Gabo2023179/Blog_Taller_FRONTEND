import React from 'react'

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-center text-gray-600 dark:text-gray-400">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Blog de Aprendizaje hecho por Jose Gabriel Contreras Sanchez 2023179 IN6BV. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
