import React from 'react';
import { AudioLines, BrainCircuit, PhoneCall, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';

const pipeline = [
  { name: 'Incoming call', detail: 'SIP' },
  { name: 'OpenSIPS', detail: 'TLS SIP proxy' },
  { name: 'FreeSWITCH', detail: 'Media · transcoding · SRTP' },
  { name: 'LiveKit', detail: 'Real-time media' },
  { name: 'Voice agent', detail: 'STT · LLM · TTS', highlight: true },
];

const work = [
  {
    icon: AudioLines,
    title: 'Real-time voice AI agent',
    status: 'Shipped',
    body: 'A Python + LiveKit agent that handles live customer calls in English and Hindi. It streams speech-to-text and text-to-speech, and uses Silero voice-activity detection plus semantic turn detection so conversations feel natural and low-latency, with barge-in. Each call runs through a config-driven conversation engine with LLM-assisted intent classification and tool calling.',
    tags: ['Python', 'LiveKit', 'Silero VAD', 'Streaming STT/TTS', 'LLM tool-calling'],
    className: 'lg:col-span-2',
  },
  {
    icon: PhoneCall,
    title: 'SIP telephony stack',
    status: 'Shipped',
    body: 'Designed and deployed the telephony path behind the agent: OpenSIPS as a TLS SIP proxy into FreeSWITCH for media handling, codec transcoding and SRTP encryption, then bridged into LiveKit.',
    tags: ['OpenSIPS', 'FreeSWITCH', 'SRTP', 'WebRTC'],
    className: '',
  },
  {
    icon: ShieldCheck,
    title: 'Auth & anti-fraud gateway',
    status: 'Shipped',
    body: 'A FastAPI gateway for authentication and anti-fraud, with Redis-backed rate limiting and phone-to-tenant identity resolution.',
    tags: ['FastAPI', 'Redis', 'Rate limiting'],
    className: '',
  },
  {
    icon: BrainCircuit,
    title: 'Context-memory layer',
    status: 'In progress',
    body: 'Designing a structured, deterministic record of every multi-turn conversation across channels. It resolves references and disambiguates intent across turns so the agent can act on prior context, and seeds a long-term memory of customer interactions.',
    tags: ['Agentic AI', 'Memory', 'Multi-channel'],
    className: 'lg:col-span-2',
  },
];

const Pipeline = () => (
  <div className="reveal card mb-6 p-6 md:p-8">
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="font-display text-lg font-medium text-white">How a call reaches the agent</h3>
      <span className="font-mono text-xs text-zinc-500">the path I designed &amp; deployed</span>
    </div>
    <ol className="flex flex-col items-stretch md:flex-row md:items-center">
      {pipeline.map((step, i) => (
        <React.Fragment key={step.name}>
          <li
            className={`rounded-xl border px-4 py-3 md:min-w-0 md:flex-1 ${
              step.highlight
                ? 'border-cyan-300/40 bg-cyan-300/[0.07] shadow-lg shadow-cyan-500/10'
                : 'border-white/10 bg-white/[0.02]'
            }`}
          >
            <p className="font-mono text-[10px] text-zinc-500">0{i + 1}</p>
            <p className={`font-medium ${step.highlight ? 'text-cyan-200' : 'text-white'}`}>{step.name}</p>
            <p className="text-xs text-zinc-400">{step.detail}</p>
          </li>
          {i < pipeline.length - 1 && (
            <>
              <span aria-hidden="true" className="flow-v mx-auto h-6 w-px bg-white/15 md:hidden" />
              <span aria-hidden="true" className="flow-h hidden h-px w-6 shrink-0 bg-white/15 md:block lg:w-10" />
            </>
          )}
        </React.Fragment>
      ))}
    </ol>
  </div>
);

const Javis = () => (
  <section id="javis" className="relative scroll-mt-20 py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        index="01"
        eyebrow="Now · Javis Technologies"
        title={
          <>
            Senior AI Engineer, <span className="text-gradient">voice agents &amp; telephony</span>
          </>
        }
      >
        Since November 2025 I&apos;ve been building Javis&apos;s voice AI platform in Bangalore, working across the
        whole stack from the SIP proxy to the LLM.
      </SectionHeading>

      <Pipeline />

      <div className="grid gap-6 lg:grid-cols-3">
        {work.map(({ icon: Icon, title, status, body, tags, className }) => (
          <article
            key={title}
            className={`reveal card group relative overflow-hidden p-6 transition-colors hover:border-white/15 md:p-8 ${className}`}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/0 blur-3xl transition-colors duration-500 group-hover:bg-cyan-400/10" />
            <div className="mb-5 flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Icon className="h-5 w-5 text-cyan-300" />
              </span>
              <span
                className={`font-mono text-[11px] ${status === 'In progress' ? 'text-amber-300' : 'text-emerald-300'}`}
              >
                ● {status}
              </span>
            </div>
            <h3 className="mb-3 font-display text-xl font-medium text-white">{title}</h3>
            <p className="mb-6 leading-relaxed text-zinc-400">{body}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Javis;
