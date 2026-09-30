import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Projects = () => (
  <section id="projects" className="scroll-mt-20 border-t border-white/[0.06] py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading index="03" eyebrow="Side projects" title="Things I built on my own" />

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="reveal card group overflow-hidden lg:col-span-2">
          <div className="relative aspect-[16/8] overflow-hidden border-b border-white/[0.06]">
            <Image
              src="/images/shortsking.webp"
              alt="Screenshot of the ShortsKing web app"
              fill
              className="object-cover object-top opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink-950/80 px-3 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur">
              Solo startup · shut down
            </span>
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl font-medium text-white">ShortsKing</h3>
              <a
                href="https://web.archive.org/web/20250915014103/https://shortsking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-sm text-cyan-300 hover:text-cyan-200"
              >
                archive.org <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mb-2 leading-relaxed text-zinc-400">
              A fully automated platform for making short videos from minimal input: a title, a visual style and a voice.
              It <span className="text-white">organically attracted over 1,000 real users</span>.
            </p>
            <p className="mb-6 leading-relaxed text-zinc-400">
              I ran the whole lifecycle on my own: design, frontend and backend, deployment, integrations and marketing.
              Content generation used open-source LLMs and ffmpeg.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Ruby on Rails', 'Open-source LLMs', 'ffmpeg'].map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="reveal card flex flex-col p-6 md:p-8">
          <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
            <Github className="h-5 w-5 text-cyan-300" />
          </span>
          <p className="eyebrow mb-2">Open source</p>
          <h3 className="mb-3 font-display text-xl font-medium text-white">Ruby on Rails</h3>
          <p className="mb-6 leading-relaxed text-zinc-400">
            Corrected the default configs for new Rails apps generated with the <code className="font-mono text-zinc-300">rails</code> CLI.
          </p>
          <div className="mt-auto flex flex-col gap-2 font-mono text-sm">
            <a
              href="https://github.com/search?q=is%3Apr%20author%3Ajjatinggoyal%20archived%3Afalse%20repo%3Arails%2Frails%20&type=pullrequests"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
            >
              rails/rails PRs <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/search?q=is%3Apr+author%3Ajjatinggoyal+archived%3Afalse&type=pullrequests"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-white"
            >
              All contributions <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export default Projects;
