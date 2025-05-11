import React from 'react'

/**
 * HeaderTitle: cabecera destacada con fondo suave y texto responsivo.
 * Props:
 *  - title (string): título principal.
 *  - subtitle (string): texto secundario opcional.
 */
const HeaderTitle = ({ title, subtitle }) => (
  <div className="max-w-4xl mx-auto bg-accent/10 dark:bg-accent/20 rounded-2xl p-8 md:p-12 mb-12">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-accent tracking-tight mb-4">
      {title}
    </h1>
    {subtitle && (
      <p className="text-lg sm:text-xl md:text-2xl text-secondary dark:text-secondary/80">
        {subtitle}
      </p>
    )}
  </div>
)

export default HeaderTitle
