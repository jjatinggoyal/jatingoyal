import React, { useEffect, useRef } from 'react';
import { Briefcase, Building, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const experienceRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Enphase Energy',
      period: 'July 2024 - Present',
      description: 'Leading development of Translation Management System and search infrastructure improvements.',
      highlights: [
        'Designed and developed a Translation Management System to centrally manage internationalization (i18n) across microservices',
        'Enhanced search functionality for core Data entity by 95% using denormalized Elasticsearch index',
        'Eliminated dependency on code changes for text updates and gave direct control to PMs',
        'Implemented data synchronization with Elasticsearch using Kafka and Logstash for real-time indexing'
      ],
      technologies: ['Ruby on Rails', 'Elasticsearch', 'Kafka', 'MongoDB', 'RDS', 'Logstash']
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Enphase Energy',
      period: 'July 2022 - June 2024',
      description: 'Developed database abstraction layer and notification systems for the organization.',
      highlights: [
        'Designed and implemented a DB abstraction layer to serve DB needs across the organization',
        'Created predefined API interfaces and exposed important events through Kafka',
        'Implemented wrapper on Active Record ORM for DB operations via API calls',
        'Delivered Notification Digest feature with data aggregation pipeline using SQS'
      ],
      technologies: ['Ruby on Rails', 'Active Record', 'Kafka', 'AWS SQS', 'API Development']
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
    
    const elements = experienceRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="experience" ref={experienceRef} className="py-20 bg-slate-50/50 dark:bg-slate-800/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 dark:text-white mb-4 animate-on-scroll opacity-0 transition-opacity duration-700">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-100"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
            My professional journey and the roles that have shaped my expertise.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-900/40"></div>
            
            {/* Experience items */}
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 animate-on-scroll opacity-0 transition-opacity duration-700`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Circle marker */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-900 z-10"></div>
                
                {/* Date for desktop */}
                <div className="hidden md:block w-1/2 md:pr-12 text-right">
                  {index % 2 === 0 ? (
                    <div className="mb-3 flex items-center justify-end">
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2">
                        {exp.period}
                      </span>
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  ) : null}
                </div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-8 md:pl-0`}>
                  {/* Mobile date */}
                  <div className="md:hidden mb-3 flex items-center">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {exp.period}
                    </span>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                        <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                          {exp.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Building className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-1" />
                          <span className="text-slate-600 dark:text-slate-300">
                            {exp.company}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {exp.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-2">
                        Key Accomplishments:
                      </h4>
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 mr-2"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-full px-2.5 py-0.5 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Date for desktop (opposite side) */}
                <div className="hidden md:block w-1/2 md:pl-12">
                  {index % 2 === 1 ? (
                    <div className="mb-3 flex items-center">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {exp.period}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;