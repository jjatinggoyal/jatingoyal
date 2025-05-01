import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    // { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      href: 'https://github.com/jjatinggoyal', 
      ariaLabel: 'GitHub',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: 'https://linkedin.com/in/jjatinggoyal', 
      ariaLabel: 'LinkedIn',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    { 
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), 
      href: 'https://x.com/jatgoy', 
      ariaLabel: 'X',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: 'mailto:jjatingoyal@gmail.com', 
      ariaLabel: 'Email' 
    },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-2xl font-bold font-montserrat text-blue-600 dark:text-blue-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
        >
          JG
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors py-2"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex space-x-4 border-l border-slate-200 dark:border-slate-700 pl-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                aria-label={link.ariaLabel}
                target={link.target}
                rel={link.rel}
                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </nav>

        <button 
          className="md:hidden text-slate-800 dark:text-white" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-sm py-4 px-4">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="block py-2 font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
                  onClick={toggleMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex space-x-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                aria-label={link.ariaLabel}
                target={link.target}
                rel={link.rel}
                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;