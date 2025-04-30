import React from 'react';
import PostList from '../../components/post/PostList';

import './homePage.css'
const Home = () => (
  <div className="home-page">
    <h1 className="text-3xl font-bold mb-6">Bienvenido al Blog de Aprendizaje</h1>
    <PostList />
  </div>
);

export default Home;