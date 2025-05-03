'use client';

import React, { useEffect, useRef } from 'react';
import { BookOpen, GraduationCap, Heart, Coffee } from 'lucide-react';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

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
    
    const elements = aboutRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-20 bg-slate-50/50 dark:bg-slate-800/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 dark:text-white mb-4 animate-on-scroll opacity-0 transition-opacity duration-700">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-100"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
            Software Engineer at Enphase Energy, specializing in scalable microservices and data systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll opacity-0 transition-opacity duration-700 delay-300">
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Hi, I'm Jatin Goyal, a Software Engineer at Enphase Energy with a strong background in building scalable microservices and data systems. I graduated from the Indian Institute of Technology, Delhi with a BTech in Computer Science and Engineering.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              At Enphase, I've led the development of a Translation Management System for internationalization and significantly improved search functionality using Elasticsearch. I'm passionate about building efficient systems and have experience with various technologies including Ruby on Rails, Java, Python, and cloud services.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm also an active contributor to the Ruby on Rails ecosystem and have developed ShortsKing.com, a content automation platform that has attracted over 500 real users. I enjoy tackling complex technical challenges and creating solutions that make a real impact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-400">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transform transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">System Design</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Designing and implementing scalable microservices architectures.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transform transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Data Systems</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Building efficient search and data processing pipelines.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transform transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Open Source</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Contributing to Ruby on Rails ecosystem and community.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transform transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Full Stack</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                End-to-end development from backend services to frontend applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;