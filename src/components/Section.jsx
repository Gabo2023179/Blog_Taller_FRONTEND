import React from 'react'

/**
 * Section: envoltorio responsivo para secciones de contenido.
 * Envía children centrados y con separación uniforme.
 */
const Section = ({ children }) => (
  <section className="max-w-4xl mx-auto space-y-8">
    {children}
  </section>
)

export default Section
