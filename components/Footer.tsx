import React from 'react';

const Footer = () => (
  <footer className="border-t border-white/[0.06] py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 font-mono text-xs text-zinc-600 md:flex-row md:px-6">
      <p>© {new Date().getFullYear()} Jatin Goyal</p>
      <a href="#top" className="hover:text-zinc-300 transition-colors">Back to top ↑</a>
    </div>
  </footer>
);

export default Footer;
