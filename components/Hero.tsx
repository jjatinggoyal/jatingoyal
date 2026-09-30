import React from 'react';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { RESUME } from './links';

// Deterministic bar heights so the waveform renders the same on every build
const bars = Array.from({ length: 36 }, (_, i) => {
  const h = 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45));
  return { h: Math.round(h * 100), delay: ((i * 83) % 1200) / 1000 };
});

const transcript = [
  { who: 'caller', text: 'Hi, mera order kab tak aayega?' },
  { who: 'agent', text: 'Ek second, main check karta hoon…', tool: 'lookup_order()' },
  { who: 'agent', text: 'Aapka order kal tak deliver ho jayega.' },
];

const CallCard = () => (
  <div className="rise card relative overflow-hidden p-5 shadow-2xl shadow-cyan-500/10 [animation-delay:250ms]">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

    <div className="mb-5 flex items-center justify-between font-mono text-xs">
      <span className="flex items-center gap-2 text-emerald-300">
        <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
        live call · en / hi
      </span>
      <span className="hidden text-zinc-500 sm:inline">sip → livekit → agent</span>
    </div>

    <div className="mb-6 flex h-20 items-center justify-between gap-[3px]" aria-hidden="true">
      {bars.map((bar, i) => (
        <span
          key={i}
          className="wave-bar w-full rounded-full bg-gradient-to-t from-cyan-400 to-violet-400"
          style={{ height: `${bar.h}%`, animationDelay: `${bar.delay}s` }}
        />
      ))}
    </div>

    <ul className="space-y-3 font-mono text-[13px] leading-relaxed">
      {transcript.map((line, i) => (
        <li key={i} className="flex gap-3">
          <span className={line.who === 'caller' ? 'w-12 shrink-0 text-violet-300' : 'w-12 shrink-0 text-cyan-300'}>
            {line.who}
          </span>
          <span className="text-zinc-300">
            {line.tool && <span className="mr-2 rounded bg-white/[0.06] px-1.5 py-0.5 text-amber-200">{line.tool}</span>}
            {line.text}
          </span>
        </li>
      ))}
    </ul>

    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
      {['VAD', 'streaming STT', 'turn detection', 'intent', 'tool call', 'TTS'].map((step) => (
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
          I build voice AI that <span className="text-gradient">picks up the phone.</span>
        </h1>

        <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl [animation-delay:160ms]">
          Hi, I&apos;m Jatin. I build real-time voice agents that handle live customer calls in English and Hindi,
          and the SIP telephony stack that connects them to the phone network. Before that I spent three years
          on microservices and search at Enphase Energy.
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

      <CallCard />
    </div>
  </section>
);

export default Hero;
