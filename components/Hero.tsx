import React from 'react';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { RESUME } from './links';

const turns = [
  { who: 'user', text: 'Status of PO 4521 and 4533?' },
  { who: 'agent', text: 'PO 4521 is dispatched. PO 4533 is awaiting an appointment slot.' },
  { who: 'user', text: 'Book the second one for Friday.' },
];

const ContextCard = () => (
  <div className="rise card relative overflow-hidden p-5 shadow-2xl shadow-cyan-500/10 [animation-delay:250ms]">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

    <div className="mb-5 flex items-center justify-between font-mono text-xs">
      <span className="flex items-center gap-2 text-emerald-300">
        <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
        turn 3 · context
      </span>
      <span className="hidden text-zinc-500 sm:inline">fetch → resolve → decide → fold</span>
    </div>

    <ul className="space-y-3 font-mono text-[13px] leading-relaxed">
      {turns.map((line, i) => (
        <li key={i} className="flex gap-3">
          <span className={line.who === 'user' ? 'w-12 shrink-0 text-violet-300' : 'w-12 shrink-0 text-cyan-300'}>
            {line.who}
          </span>
          <span className="text-zinc-300">{line.text}</span>
        </li>
      ))}
    </ul>

    <div className="mt-5 rounded-xl border border-white/[0.06] bg-ink-950/60 p-4 font-mono text-[12px] leading-relaxed">
      <p className="text-zinc-500">{'// resolved from context, not re-asked'}</p>
      <p>
        <span className="text-zinc-500">ref </span>
        <span className="text-amber-200">&quot;the second one&quot;</span>
        <span className="text-zinc-500"> → </span>
        <span className="text-cyan-200">po_number: 4533</span>
      </p>
      <p>
        <span className="text-zinc-500">intent </span>
        <span className="text-white">book_appointment</span>
        <span className="text-zinc-500"> · slot </span>
        <span className="text-white">Fri</span>
      </p>
      <p>
        <span className="text-zinc-500">tier </span>
        <span className="text-emerald-300">structural</span>
        <span className="text-zinc-500"> · no LLM call</span>
      </p>
    </div>

    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
      {['context bundle', 'reference resolution', 'intents', 'commitments', 'memory'].map((step) => (
        <span key={step} className="chip text-[11px]">{step}</span>
      ))}
    </div>
    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600">Illustrative example</p>
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
          Hi, I&apos;m Jatin. At Javis I build the context and memory layer of an agentic AI platform, plus the
          decision primitives agents use in real business workflows. Earlier at Javis I built real-time voice agents
          and SIP telephony. Before that I spent three years on microservices and search at Enphase Energy.
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

      <ContextCard />
    </div>
  </section>
);

export default Hero;
