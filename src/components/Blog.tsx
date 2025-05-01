import React, { useEffect, useRef } from 'react';
import { CalendarDays, Clock, ArrowUpRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  url: string;
}

const Blog: React.FC = () => {
  const blogRef = useRef<HTMLDivElement>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Scalable APIs with Ruby on Rails',
      excerpt: 'Learn how to design and implement RESTful APIs that can handle millions of requests per day.',
      date: 'March 15, 2024',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Backend',
      url: '#'
    },
    {
      id: 2,
      title: 'Microservices Architecture: Pros and Cons',
      excerpt: 'A deep dive into when you should (and shouldn\'t) use microservices for your applications.',
      date: 'February 28, 2024',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Architecture',
      url: '#'
    },
    {
      id: 3,
      title: 'The Future of AI in Software Development',
      excerpt: 'Exploring how artificial intelligence is transforming the way we write and maintain code.',
      date: 'January 10, 2024',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Technology',
      url: '#'
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
    
    const elements = blogRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="blog" ref={blogRef} className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-slate-800 dark:text-white mb-4 animate-on-scroll opacity-0 transition-opacity duration-700">
            Latest Articles
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 animate-on-scroll opacity-0 transition-opacity duration-700 delay-100"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 animate-on-scroll opacity-0 transition-opacity duration-700 delay-200">
            Thoughts, insights, and tutorials from my development journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg group animate-on-scroll opacity-0 transition-opacity duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <a href={post.url} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 m-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center mr-4">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center font-medium text-blue-600 dark:text-blue-400">
                    <span>Read more</span>
                    <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll opacity-0 transition-opacity duration-700 delay-300">
          <a 
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-colors"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;