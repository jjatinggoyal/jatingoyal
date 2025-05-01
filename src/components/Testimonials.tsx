import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Project Manager',
      company: 'Digital Solutions Ltd.',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: "Jatin is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills have been instrumental in the success of our projects. He's also a great team player who elevates everyone around him."
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO',
      company: 'Tech Innovations Inc.',
      avatar: 'https://images.pexels.com/photos/943235/pexels-photo-943235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: "Working with Jatin has been a pleasure. His technical expertise and ability to quickly understand complex requirements make him a valuable asset to any team. He maintains high standards in his work and always meets deadlines."
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Senior Developer',
      company: 'Web Creators Co.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: "I've had the pleasure of collaborating with Jatin on several projects. His code is clean, well-documented, and robust. Beyond his technical skills, his positive attitude and willingness to share knowledge make him an excellent colleague."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

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
    
    const elements = testimonialsRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={testimonialsRef}
      className="py-20 bg-slate-50 dark:bg-slate-800/50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 dark:text-white mb-4 animate-on-scroll opacity-0 transition-opacity duration-700">
            What People Say
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-100"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
            Feedback from colleagues and clients I've had the pleasure to work with.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative animate-on-scroll opacity-0 transition-opacity duration-700 delay-300">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-8 md:p-10 shadow-md border border-slate-200 dark:border-slate-700 relative">
                    <div className="absolute top-6 left-8 text-blue-100 dark:text-blue-900/30">
                      <Quote className="h-16 w-16" />
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 italic mb-8 relative z-10">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800"
                        />
                        <div className="ml-4">
                          <h4 className="font-semibold text-slate-800 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-0 w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 dark:bg-blue-400 w-6' 
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;