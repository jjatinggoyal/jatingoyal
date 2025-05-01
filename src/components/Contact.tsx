import React, { useEffect, useRef } from 'react';
import { Mail, MessageSquare, Phone, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);

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
    
    const elements = contactRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="py-20 theme-bg-primary"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat theme-primary mb-4 animate-on-scroll opacity-0 transition-opacity duration-700">
            Get In Touch
          </h2>
          <div className="w-20 h-1 theme-secondary mx-auto mb-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-100"></div>
          <p className="text-lg theme-text-secondary animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
            Feel free to reach out through any of these channels
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="theme-card p-8 rounded-xl shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg theme-bg-tertiary flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 theme-primary" />
                </div>
                <div>
                  <p className="text-sm theme-text-tertiary mb-1">Email</p>
                  <a 
                    href="mailto:jjatingoyal@gmail.com" 
                    className="theme-text-primary hover:theme-primary transition-colors"
                  >
                    jjatingoyal@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg theme-bg-tertiary flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 theme-primary" />
                </div>
                <div>
                  <p className="text-sm theme-text-tertiary mb-1">Phone</p>
                  <a 
                    href="tel:+919610973125" 
                    className="theme-text-primary hover:theme-primary transition-colors"
                  >
                    +91 9610973125
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg theme-bg-tertiary flex items-center justify-center mr-4">
                  <MessageSquare className="h-6 w-6 theme-primary" />
                </div>
                <div>
                  <p className="text-sm theme-text-tertiary mb-1">Social Media</p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/jjatinggoyal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="theme-text-primary hover:theme-primary transition-colors flex items-center gap-2"
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://linkedin.com/in/jjatinggoyal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="theme-text-primary hover:theme-primary transition-colors flex items-center gap-2"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://x.com/jatgoy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="theme-text-primary hover:theme-primary transition-colors flex items-center gap-2"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>X</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;