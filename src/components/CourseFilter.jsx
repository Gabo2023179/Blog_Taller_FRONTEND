// src/components/CourseFilter.jsx
import React from 'react'

// Opciones de cursos
const options = [
  { value: '', label: 'Todos los cursos' },
  { value: 'Taller', label: 'Taller' },
  { value: 'Práctica Supervisada', label: 'Práctica Supervisada' },
  { value: 'Tecnología', label: 'Tecnología' },
]

export default function CourseFilter({ selectedCourse, onChange }) {
  return (
    <div role="radiogroup" className="flex flex-wrap justify-center gap-3 mb-8">
      {options.map(({ value, label }) => {
        const isActive = selectedCourse === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            role="radio"
            aria-checked={isActive}
            className={`px-5 py-2 rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              isActive
                ? 'bg-accent text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
