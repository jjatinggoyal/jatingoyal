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
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium mb-6 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
            Software Engineer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight text-slate-800 dark:text-white mb-6 animate-on-scroll opacity-0 transition-opacity duration-1000">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Jatin Goyal</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg animate-on-scroll opacity-0 transition-opacity duration-1000 delay-150">
            Crafting elegant solutions with Ruby on Rails, Java Spring Boot, and Python. Passionate about open-source and building software that matters.
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
              href="https://github.com/" 
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
        
        <div className="relative hidden md:block animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
          <div className="relative z-10 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transform transition-transform hover:scale-[1.02] duration-500">
            <div className="flex items-center mb-6">
              <div className="mr-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <Code className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-800 dark:text-white">Software Engineer</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">2.5+ years of experience</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ruby on Rails</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Advanced</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Java Spring Boot</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Intermediate</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Python</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Intermediate</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Current focus:</span>
                  <span className="text-slate-500 dark:text-slate-400 ml-2">Open-source contributions</span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">R</div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">J</div>
                  <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">P</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;