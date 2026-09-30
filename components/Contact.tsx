import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { EMAIL, GITHUB, LINKEDIN, PHONE, PHONE_HREF, X } from './links';

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const channels = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  { label: 'Phone', value: PHONE, href: PHONE_HREF, icon: Phone },
  { label: 'GitHub', value: 'jjatinggoyal', href: GITHUB, icon: Github, external: true },
  { label: 'LinkedIn', value: 'jjatinggoyal', href: LINKEDIN, icon: Linkedin, external: true },
  { label: 'X', value: '@jatgoy', href: X, icon: XIcon, external: true },
];

const Contact = () => (
  <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
    <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

    <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div className="reveal">
        <p className="eyebrow mb-4">
          <span className="text-zinc-500">05 /</span> Contact
        </p>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Let&apos;s <span className="text-gradient">talk.</span>
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-400">
          Want to talk about voice AI, real-time systems or telephony? Get in touch.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
            <Image src="/images/profile.jpg" alt="Jatin Goyal" fill className="object-cover" sizes="56px" />
          </div>
          <div>
            <p className="font-medium text-white">Jatin Goyal</p>
            <p className="font-mono text-xs text-zinc-500">Senior AI Engineer · Javis</p>
          </div>
        </div>
      </div>

      <ul className="reveal card divide-y divide-white/[0.06] overflow-hidden">
        {channels.map(({ label, value, href, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03]"
            >
              <Icon className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-cyan-300" />
              <span className="w-20 font-mono text-xs uppercase tracking-widest text-zinc-500">{label}</span>
              <span className="flex-1 truncate text-white">{value}</span>
              <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
