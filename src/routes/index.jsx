import React from 'react';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

export const routes = [

    { path: '/', element: <HomePage /> },
    { path: '*', element: <NotFoundPage /> } // Ruta para manejar 404
]