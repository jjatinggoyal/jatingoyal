import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github, Coffee, Code } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen flex items-center relative pt-20 pb-16"
    >
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-sm font-medium mb-6 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
            Senior Software Engineer at Enphase Energy
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight text-slate-800 dark:text-white mb-6 animate-on-scroll opacity-0 transition-opacity duration-1000">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Jatin Goyal</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg animate-on-scroll opacity-0 transition-opacity duration-1000 delay-150">
            Full-stack engineer specializing in building scalable microservices and data systems. Experienced with Ruby on Rails, Java, and Python. Open-source contributor to Ruby on Rails ecosystem.
          </p>
          <div className="flex flex-wrap gap-4 mb-12 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
            <a 
              href="#projects" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Get In Touch
            </a>
          </div>
          
          <div className="flex items-center gap-x-6 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-450">
            <a 
              href="https://github.com/jjatinggoyal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-x-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <div className="h-4 border-r border-slate-300 dark:border-slate-700"></div>
            <div className="flex items-center gap-x-2 text-slate-600 dark:text-slate-400">
              <Coffee className="h-5 w-5" />
              <span>Open to opportunities</span>
            </div>
          </div>
        </div>
        
        <div className="relative order-1 md:order-2 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
          <div className="relative w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto rounded-2xl overflow-hidden bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <img
              src="/images/profile.jpg"
              alt="Jatin Goyal"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;