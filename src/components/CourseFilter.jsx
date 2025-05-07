import React from 'react';

// Definición de los cursos reales
const courses = [
  { value: '', label: 'Todos los cursos' },
  { value: 'Taller', label: 'Taller' },
  { value: 'Practica Supervisada', label: 'Práctica Supervisada' },
  { value: 'Tecnologia', label: 'Tecnología' },
];

/**
 * CourseFilter: muestra filtros de cursos como botones "pill".
 * Props:
 *  - selectedCourse: valor del curso actualmente seleccionado.
 *  - onChange: callback al cambiar selección.
 */
export default function CourseFilter({ selectedCourse, onChange }) {
  return (
    <div role="radiogroup" className="flex flex-wrap justify-center gap-3 mb-8">
      {courses.map((course) => {
        const active = selectedCourse === course.value;
        return (
          <button
            key={course.value}
            onClick={() => onChange(course.value)}
            role="radio"
            aria-checked={active}
            className={`px-5 py-2 rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              active
                ? 'bg-accent text-primary shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {course.label}
          </button>
        );
      })}
    </div>
  );
}
