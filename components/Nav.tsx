import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RESUME } from './links';

const navLinks = [
  { name: 'Javis', href: '#javis' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Nav = () => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
      <a href="#top" className="group flex items-center gap-2 font-mono text-sm text-white">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] font-display font-semibold transition-colors group-hover:border-cyan-300/50">
          JG
        </span>
        <span className="hidden sm:inline text-zinc-400 group-hover:text-white transition-colors">
          jatingoyal.com
        </span>
      </a>

      <nav className="flex items-center gap-1">
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="md:hidden rounded-lg px-3 py-2 text-sm text-zinc-400 hover:text-white"
        >
          Contact
        </a>
        <a
          href={RESUME}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-cyan-200"
        >
          Resume <ArrowUpRight className="h-4 w-4" />
        </a>
      </nav>
    </div>
  </header>
);

export default Nav;
