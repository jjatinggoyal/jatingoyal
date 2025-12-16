'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Code, Building2, ExternalLink, Briefcase } from 'lucide-react';
import Image from 'next/image';

const Portfolio: React.FC = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<{
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    demoLink?: string;
  } | null>(null);

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
    
    const elements = portfolioRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };

    if (activeProject) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeProject]);

  const project = {
    title: 'Content Automation Platform - ShortsKing.com (Now Archived)',
    description: 'A fully automated short video content creation platform with minimal user input.',
    longDescription: "Developed and launched a fully automated short video content creation platform requiring minimal user input (title, visual style, voice). The platform organically attracted over 500 real users. Independently managed the complete lifecycle of the Ruby on Rails full-stack application, including design, development (frontend/backend), deployment, integrations, and marketing. Leveraged open-source LLMs and ffmpeg for content generation and processing.",
    image: '/images/shortsking.png',
    technologies: ['Ruby on Rails', 'LLMs', 'ffmpeg', 'AWS', 'React', 'PostgreSQL'],
    demoLink: 'https://web.archive.org/web/20250915014103/https://shortsking.com/'
  };

  return (
    <section 
      id="portfolio" 
      ref={portfolioRef}
      className="py-20 theme-bg-primary"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat theme-primary mb-4 animate-on-scroll opacity-0 transition-opacity duration-700">
            My Portfolio
          </h2>
          <div className="w-20 h-1 theme-secondary mx-auto mb-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-100"></div>
          <p className="text-lg theme-text-secondary animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
            A showcase of my products, open-source contributions, and professional experience
          </p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 theme-bg-tertiary hover:theme-bg-secondary rounded-lg transition-all duration-300 group"
          >
            <Briefcase className="h-4 w-4 theme-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm theme-text-primary">View Resume</span>
            <ArrowRight className="h-4 w-4 theme-primary group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Products Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold font-montserrat theme-text-primary mb-8 flex items-center gap-2">
            <Code className="h-6 w-6 theme-primary" />
            Products
          </h3>
          <div className="max-w-4xl mx-auto">
            <div 
              className="theme-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg animate-on-scroll opacity-0 transition-opacity duration-700 cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 theme-primary bg-opacity-90 text-white text-xs font-medium px-2 py-1 rounded">
                  Featured
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold theme-text-primary mb-4">
                  {project.title}
                </h3>
                <p className="theme-text-secondary mb-6 text-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="inline-block theme-bg-tertiary theme-text-primary rounded-full px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    className="theme-primary font-medium hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(project);
                    }}
                  >
                    View Details
                  </button>
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 theme-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="font-medium">ShortsKing (Archive.org)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div 
            className="fixed inset-0 theme-modal-overlay z-50 flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <div 
              className="theme-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                  onClick={() => setActiveProject(null)}
                >
                  &times;
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold theme-text-primary">
                    {activeProject.title}
                  </h3>
                  <div className="flex space-x-4 mt-2 md:mt-0">
                    {activeProject.demoLink && (
                      <a 
                        href={activeProject.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 theme-primary"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="font-medium">ShortsKing (Archive.org)</span>
                      </a>
                    )}
                  </div>
                </div>
                <p className="theme-text-secondary mb-6 leading-relaxed">
                  {activeProject.longDescription}
                </p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold theme-text-primary mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="inline-block theme-bg-tertiary theme-text-primary rounded-full px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold theme-text-primary mb-3">
                    Project Highlights
                  </h4>
                  <ul className="list-disc list-inside theme-text-secondary space-y-2">
                    <li>Built a user-friendly interface for creating AI-generated videos</li>
                    <li>Implemented a robust video generation pipeline</li>
                    <li>Created a style and genre selection system for customized video creation</li>
                    <li>Developed an efficient export system for different platforms</li>
                  </ul>
                </div>
                <div className="pt-4 theme-border flex justify-end">
                  <button 
                    className="px-4 py-2 theme-bg-tertiary hover:theme-bg-secondary theme-text-primary rounded-lg transition-colors"
                    onClick={() => setActiveProject(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Open Source Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold font-montserrat theme-text-primary mb-8 flex items-center gap-2">
            <Github className="h-6 w-6 theme-primary" />
            Open Source
          </h3>
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Github className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">Pay gem - Ruby on Rails Payment Integration</h4>
                    <a 
                      href="https://github.com/search?q=is%3Apr%20author%3Ajjatinggoyal%20archived%3Afalse%20repo%3Apay-rails%2Fpay%20&type=pullrequests" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Enhanced subscription management API with a patch for greater business flexibility in payment handling and resolved a critical create customer API bug that prevented payment provider data population in the app&apos;s database.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Ruby on Rails</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">API Development</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Payment Integration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Github className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">Ruby on Rails Framework Contribution</h4>
                    <a 
                      href="https://github.com/search?q=is%3Apr%20author%3Ajjatinggoyal%20archived%3Afalse%20repo%3Arails%2Frails%20&type=pullrequests" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Contributed to the Ruby on Rails framework by updating default configurations for greenfield rails apps created using the rails CLI. This improvement helps developers get started with better default settings.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Ruby on Rails</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Open Source</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/search?q=is%3Apr+author%3Ajjatinggoyal+archived%3Afalse&type=pullrequests"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 theme-bg-tertiary hover:theme-bg-secondary rounded-lg transition-all duration-300 group"
            >
              <Github className="h-4 w-4 theme-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm theme-text-primary">View All Contributions</span>
              <ArrowRight className="h-4 w-4 theme-primary group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Professional Experience Section */}
        <div>
          <h3 className="text-2xl font-bold font-montserrat theme-text-primary mb-8 flex items-center gap-2">
            <Building2 className="h-6 w-6 theme-primary" />
            Professional Experience
          </h3>
          <div className="space-y-8">
            <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white">Senior Software Engineer</h4>
                  <p className="text-slate-600 dark:text-slate-300">Enphase Energy</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">July 2024 - Present</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Leading development of Translation Management System and search infrastructure improvements.
              </p>
              <div className="space-y-4 mb-4">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Designed and developed a Translation Management System to centrally manage internationalization (i18n) across microservices
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Enhanced search functionality for core Data entity by 95% using denormalized Elasticsearch index
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Eliminated dependency on code changes for text updates and gave direct control to PMs
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Implemented data synchronization with Elasticsearch using Kafka and Logstash for real-time indexing
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Ruby on Rails</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Elasticsearch</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Kafka</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">MongoDB</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">RDS</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Logstash</span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white">Software Engineer</h4>
                  <p className="text-slate-600 dark:text-slate-300">Enphase Energy</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">July 2022 - June 2024</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Developed database abstraction layer and notification systems for the organization.
              </p>
              <div className="space-y-4 mb-4">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Designed and implemented a DB abstraction layer to serve DB needs across the organization
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Created predefined API interfaces and exposed important events through Kafka
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Implemented wrapper on Active Record ORM for DB operations via API calls
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5"></span>
                  <p className="text-slate-600 dark:text-slate-300">
                    Delivered Notification Digest feature with data aggregation pipeline using SQS
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Ruby on Rails</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Active Record</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">Kafka</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">AWS SQS</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">API Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;