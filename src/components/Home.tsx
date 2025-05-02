import React from 'react';
import Hero from './Hero';
import About from './About';
import Portfolio from './Portfolio';
import BlogPreview from './BlogPreview';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <BlogPreview />
      <Contact />
    </>
  );
};

export default Home;