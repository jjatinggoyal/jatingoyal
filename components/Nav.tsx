'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { RESUME } from './links';

const navLinks = [
  { name: 'Javis', href: '#javis' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Nav = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
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

        <nav className="flex items-center gap-1" aria-label="Main">
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
            href={RESUME}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-cyan-200"
          >
            Resume <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="ml-1 grid h-9 w-9 place-items-center rounded-lg text-zinc-300 hover:bg-white/[0.06] hover:text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <ul id="mobile-nav" className="border-t border-white/[0.06] px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-zinc-300 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Nav;
