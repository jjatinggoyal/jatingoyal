'use client';

import React, { useEffect, useRef } from 'react';
import { Code, Database, Cloud, Cpu } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
  color: string;
}

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    // Backend
    { name: 'Ruby on Rails', level: 90, category: 'backend', color: 'bg-red-500' },
    { name: 'Java', level: 85, category: 'backend', color: 'bg-green-600' },
    { name: 'Python', level: 85, category: 'backend', color: 'bg-blue-500' },
    { name: 'SQL/KQL', level: 85, category: 'backend', color: 'bg-indigo-600' },
    { name: 'FastAPI', level: 80, category: 'backend', color: 'bg-emerald-500' },
    
    // Frontend
    { name: 'JavaScript', level: 80, category: 'frontend', color: 'bg-yellow-500' },
    { name: 'HTML/CSS', level: 75, category: 'frontend', color: 'bg-orange-500' },
    { name: 'React', level: 70, category: 'frontend', color: 'bg-cyan-500' },
    
    // Tools & Infrastructure
    { name: 'AWS Cloud', level: 85, category: 'tools', color: 'bg-amber-500' },
    { name: 'Kafka', level: 85, category: 'tools', color: 'bg-rose-500' },
    { name: 'Docker', level: 80, category: 'tools', color: 'bg-blue-600' },
    { name: 'Elasticsearch', level: 80, category: 'tools', color: 'bg-purple-600' },
    { name: 'Airflow', level: 75, category: 'tools', color: 'bg-teal-500' },
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
    
    // Store ref value in a variable to use in cleanup
    const currentRef = skillsRef.current;
    const elements = currentRef?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      if (currentRef) {
        const elements = currentRef.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const filterSkills = (category: 'frontend' | 'backend' | 'tools') => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section 
      id="skills" 
      ref={skillsRef}
      className="py-20 bg-white dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Here&apos;s what I&apos;m good at
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
              Backend Development
            </h3>
            <div className="space-y-6">
              {filterSkills('backend').map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`skill-bar h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: '0%' }}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
              Frontend Development
            </h3>
            <div className="space-y-6">
              {filterSkills('frontend').map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`skill-bar h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: '0%' }}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
              Tools & DevOps
            </h3>
            <div className="space-y-6">
              {filterSkills('tools').map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`skill-bar h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: '0%' }}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;