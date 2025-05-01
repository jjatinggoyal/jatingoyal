import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Video } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  repoLink?: string;
  featured: boolean;
}

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Content Automation Platform - ShortsKing.com',
      description: 'A fully automated short video content creation platform with minimal user input.',
      longDescription: 'Developed and launched a fully automated short video content creation platform requiring minimal user input (title, visual style, voice). The platform organically attracted over 500 real users. Independently managed the complete lifecycle of the Ruby on Rails full-stack application, including design, development (frontend/backend), deployment, integrations, and marketing. Leveraged open-source LLMs and ffmpeg for content generation and processing.',
      image: '/images/shortsking.png',
      technologies: ['Ruby on Rails', 'LLMs', 'ffmpeg', 'AWS', 'React', 'PostgreSQL'],
      demoLink: 'https://shortsking.com',
      featured: true
    },
    {
      id: 2,
      title: 'Pay gem - Ruby on Rails Payment Integration',
      description: 'Enhanced subscription management API and fixed critical customer creation bug.',
      longDescription: 'Enhanced subscription management API with a patch for greater business flexibility in payment handling and resolved a critical create customer API bug that prevented payment provider data population in the app\'s database.',
      image: '/images/paygem.jpg',
      technologies: ['Ruby on Rails', 'API Development', 'Payment Integration'],
      repoLink: 'https://github.com/search?q=is%3Apr%20author%3Ajjatinggoyal%20archived%3Afalse%20repo%3Apay-rails%2Fpay%20&type=pullrequests',
      featured: false
    },
    {
      id: 3,
      title: 'Ruby on Rails Framework Contribution',
      description: 'Updated default configurations for greenfield Rails applications.',
      longDescription: 'Contributed to the Ruby on Rails framework by updating default configurations for greenfield rails apps created using the rails CLI. This improvement helps developers get started with better default settings.',
      image: '/images/rails.jpg',
      technologies: ['Ruby on Rails', 'Open Source'],
      repoLink: 'https://github.com/search?q=is%3Apr%20author%3Ajjatinggoyal%20archived%3Afalse%20repo%3Arails%2Frails%20&type=pullrequests',
      featured: false
    }
  ];

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
    
    const elements = projectsRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-slate-50/50 dark:bg-slate-800/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 dark:text-white mb-4 animate-on-scroll opacity-0 transition-opacity duration-700">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-100"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
            Here's my featured project that showcases my skills and experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg animate-on-scroll opacity-0 transition-opacity duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setActiveProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-full px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(project);
                    }}
                  >
                    View Details
                  </button>
                  <div className="flex space-x-4">
                    {project.repoLink && (
                      <a 
                        href={project.repoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-6 w-6" />
                      </a>
                    )}
                    {project.demoLink && (
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
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
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                    {activeProject.title}
                  </h3>
                  <div className="flex space-x-4 mt-2 md:mt-0">
                    {activeProject.repoLink && (
                      <a 
                        href={activeProject.repoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Github className="h-5 w-5" />
                        <span className="font-medium">Source Code</span>
                      </a>
                    )}
                    {activeProject.demoLink && (
                      <a 
                        href={activeProject.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="font-medium">Visit ShortsKing</span>
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {activeProject.longDescription}
                </p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-full px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    Project Highlights
                  </h4>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                    <li>Built a user-friendly interface for creating AI-generated videos</li>
                    <li>Implemented a robust video generation pipeline</li>
                    <li>Created a style and genre selection system for customized video creation</li>
                    <li>Developed an efficient export system for different platforms</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <button 
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg transition-colors"
                    onClick={() => setActiveProject(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;