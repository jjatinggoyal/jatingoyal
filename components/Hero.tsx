import React from 'react';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { RESUME } from './links';

const Portrait = () => (
  <div className="rise relative mx-auto w-full max-w-sm [animation-delay:250ms]">
    <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-500/20 blur-2xl" />
    <div className="card relative overflow-hidden p-3">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src="/images/profile.jpg"
          alt="Jatin Goyal"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 384px, 400px"
        />
      </div>
      <div className="flex items-center justify-between px-2 pb-1 pt-4">
        <div>
          <p className="font-medium text-white">Jatin Goyal</p>
          <p className="font-mono text-xs text-zinc-500">Senior AI Engineer · Javis</p>
        </div>
        <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
    <div className="grid-bg pointer-events-none absolute inset-0" />
    <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
    <div className="pointer-events-none absolute top-40 -right-40 h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-3xl" />

    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 md:px-6 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <a
          href="#javis"
          className="rise mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 text-sm text-zinc-300 transition-colors hover:border-cyan-300/40"
        >
          <span className="rounded-full bg-cyan-300/15 px-2 py-0.5 font-mono text-xs text-cyan-200">Now</span>
          Senior AI Engineer at Javis Technologies
        </a>

        <h1 className="rise font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl [animation-delay:80ms]">
          I build AI agents that <span className="text-gradient">remember what you meant.</span>
        </h1>

        <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl [animation-delay:160ms]">
          Hi, I&apos;m Jatin, a Senior AI Engineer at Javis. I build AI agents that can follow long conversations,
          keep track of what&apos;s been agreed, and make sound decisions in real business workflows.
        </p>

        <div className="rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:240ms]">
          <a
            href="#javis"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-violet-400 px-6 py-3 font-medium text-ink-950 transition-opacity hover:opacity-90"
          >
            What I&apos;m building <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href={RESUME}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
          >
            Resume <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-zinc-500 [animation-delay:320ms]">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Bangalore, IN</span>
          <span>B.Tech CSE · IIT Delhi</span>
        </div>
      </div>

      <Portrait />
    </div>
  </section>
);

export default Hero;
