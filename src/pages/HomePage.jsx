import React from 'react'
import PostList from '../components/post/PostList'
import Hero from '../components/Hero'
import Section from '../components/Section'
import FeaturedPost from '../components/FeaturedPost'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'


export default function HomePage() {
    return (
      <>
        <Navbar />
  
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 antialiased">
          <Hero
            title="Blog de Aprendizaje"
            subtitle="Explora proyectos y actividades organizadas por curso"
          />
  
          <section className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Destacado</h2>
            <FeaturedPost />
          </section>
  
          <Section>
            <PostList />
          </Section>
         
          
   
          
        </main>
  
        <Footer />
      </>
    )
  }