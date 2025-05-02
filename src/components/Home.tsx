import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './Hero';
import About from './About';
import Portfolio from './Portfolio';
import BlogPreview from './BlogPreview';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Jatin Goyal</title>
        
        <meta name="description" content="Portfolio website of Jatin Goyal, a Software Engineer specializing in Ruby, Java, Python, and cloud technologies." />
        <meta property="og:title" content="Jatin Goyal" />
        <meta property="og:description" content="Portfolio website of Jatin Goyal, a Software Engineer specializing in Ruby, Java, Python, and cloud technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jatingoyal.com" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jatingoyal.com/" />
        <meta property="twitter:title" content="Jatin Goyal" />
        <meta property="twitter:description" content="Portfolio website of Jatin Goyal, a Software Engineer specializing in Ruby, Java, Python, and cloud technologies." />
        <meta property="twitter:image" content="https://jatingoyal.com/images/profile.jpg" />
        
        <link rel="canonical" href="https://jatingoyal.com" />
      </Helmet>
      <Hero />
      <About />
      <Portfolio />
      <BlogPreview />
      <Contact />
    </>
  );
};

export default Home;