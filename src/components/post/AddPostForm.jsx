import React, { useState } from 'react'
import { createPost } from '../../services/api'

/**
 * AddPostForm: formulario para crear nuevas publicaciones
 */
const AddPostForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '', course: '' })
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [generalError, setGeneralError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFieldErrors(prev => ({ ...prev, [name]: '' }))
    setGeneralError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setFieldErrors({})
    setGeneralError('')
    try {
      await createPost(formData)
      window.location.reload()
    } catch (err) {
      const resp = err.response?.data
      if (Array.isArray(resp?.errors)) {
        const errs = {}
        resp.errors.forEach(error => {
          errs[error.param] = error.msg
        })
        setFieldErrors(errs)
      } else if (resp?.message) {
        setGeneralError(resp.message)
      } else {
        setGeneralError('Ocurrió un error inesperado.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Agregar Publicación
      </h2>

      {generalError && (
        <div className="text-red-500 bg-red-100 dark:bg-red-900/50 p-2 rounded">
          {generalError}
        </div>
      )}

      {/* Título */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Mínimo 5 caracteres"
          className="mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2
                     placeholder-gray-400 dark:placeholder-gray-500 text-gray-600 dark:text-gray-300
                     focus:outline-none focus:ring-accent focus:border-accent"
        />
        {fieldErrors.title && (
          <p className="mt-1 text-red-500 text-sm">{fieldErrors.title}</p>
        )}
      </div>

      {/* Contenido */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contenido
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          value={formData.content}
          onChange={handleChange}
          placeholder="Mínimo 10 caracteres"
          className="mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2
                     placeholder-gray-400 dark:placeholder-gray-500 text-gray-600 dark:text-gray-300
                     focus:outline-none focus:ring-accent focus:border-accent"
        />
        {fieldErrors.content && (
          <p className="mt-1 text-red-500 text-sm">{fieldErrors.content}</p>
        )}
      </div>

      {/* Curso */}
      <div>
        <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Curso
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2
                     text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-accent focus:border-accent"
        >
          <option value="" disabled>
            Selecciona un curso
          </option>
          <option value="Taller">Taller</option>
          <option value="Práctica Supervisada">Práctica Supervisada</option>
          <option value="Tecnología">Tecnología</option>
        </select>
        {fieldErrors.course && (
          <p className="mt-1 text-red-500 text-sm">{fieldErrors.course}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 px-4 bg-accent text-white font-medium rounded-md shadow hover:bg-accent-dark
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50"
      >
        {submitting ? 'Agregando...' : 'Agregar Publicación'}
      </button>
    </form>
  )
}

export default AddPostForm
