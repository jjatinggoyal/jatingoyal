import React from 'react';
import { AudioLines, BrainCircuit, Mails, Scale, Crosshair } from 'lucide-react';
import SectionHeading from './SectionHeading';

const loop = [
  { name: 'Message', detail: 'Chat · email · voice' },
  { name: 'Fetch context', detail: 'Structured record, not the transcript' },
  { name: 'Resolve', detail: '"the second one" → PO 4533' },
  { name: 'Decide', detail: 'Deterministic tools' },
  { name: 'Fold into memory', detail: 'Intents · entities · commitments', highlight: true },
];

const now = [
  {
    icon: BrainCircuit,
    title: 'Context & memory layer',
    body: 'Every turn of a conversation gets folded into a structured, deterministic record of intents, entities, topics and commitments. Each turn the agent reads a compact context bundle instead of re-reading the whole transcript, so it can pick up threads, resume suspended topics and act on what was already agreed. The same record seeds a long-term memory of customer interactions.',
    tags: ['Python', 'gRPC / Protobuf', 'DynamoDB'],
    className: 'lg:col-span-2',
  },
  {
    icon: Crosshair,
    title: 'Reference resolution',
    body: 'Works out what "that one", "the second" or "doosra wala" refers to. Structural matching runs first, then lexical, and a constrained LLM pick only as a last resort. Every answer is checked against what the user actually saw.',
    tags: ['Tiered resolver', 'Hinglish'],
    className: '',
  },
  {
    icon: Mails,
    title: 'Multi-party email threads',
    body: 'Extending context from chat to long, threaded business email with several parties, tracking who claimed what, who committed to what, and by when.',
    tags: ['Claims', 'Commitments', 'Deadlines'],
    className: '',
  },
  {
    icon: Scale,
    title: 'Agent decision primitives',
    body: 'Negotiation and appointment-scheduling building blocks for enterprise workflows. The LLM understands the message and writes the reply; deterministic tools evaluate the options and make the decision, so the same situation always gets the same outcome.',
    tags: ['Negotiation', 'Scheduling', 'LLM + deterministic tools'],
    className: 'lg:col-span-2',
  },
];

const ContextLoop = () => (
  <div className="reveal card mb-6 p-6 md:p-8">
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="font-display text-lg font-medium text-white">What happens on every turn</h3>
      <span className="font-mono text-xs text-zinc-500">simplified</span>
    </div>
    <ol className="flex flex-col items-stretch md:flex-row md:items-center">
      {loop.map((step, i) => (
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
          {i < loop.length - 1 && (
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
            Senior AI Engineer, <span className="text-gradient">context, memory &amp; agent primitives</span>
          </>
        }
      >
        Since November 2025 I&apos;ve been building the core of Javis&apos;s agentic AI platform for enterprise
        workflows in Bangalore. Right now that means the layer that lets agents follow long, multi-party
        conversations, and the primitives they use to make decisions.
      </SectionHeading>

      <ContextLoop />

      <div className="grid gap-6 lg:grid-cols-3">
        {now.map(({ icon: Icon, title, body, tags, className }) => (
          <article
            key={title}
            className={`reveal card group relative overflow-hidden p-6 transition-colors hover:border-white/15 md:p-8 ${className}`}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/0 blur-3xl transition-colors duration-500 group-hover:bg-cyan-400/10" />
            <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
              <Icon className="h-5 w-5 text-cyan-300" />
            </span>
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

      <article className="reveal card mt-6 flex flex-col gap-6 p-6 md:flex-row md:items-start md:p-8">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
          <AudioLines className="h-5 w-5 text-violet-300" />
        </span>
        <div className="flex-1">
          <p className="eyebrow mb-2 !text-violet-300/80">Earlier at Javis</p>
          <h3 className="mb-3 font-display text-xl font-medium text-white">Real-time voice agent &amp; SIP telephony</h3>
          <p className="mb-5 max-w-3xl leading-relaxed text-zinc-400">
            Built a Python + LiveKit voice agent that handled live customer calls in English and Hindi, with streaming
            STT/TTS, Silero VAD, semantic turn detection and barge-in. I also designed and deployed the telephony path
            behind it (OpenSIPS → FreeSWITCH → LiveKit with SRTP), plus a FastAPI auth and anti-fraud gateway with
            Redis rate limiting.
          </p>
          <div className="flex flex-wrap gap-2">
            {['LiveKit', 'OpenSIPS', 'FreeSWITCH', 'FastAPI', 'Redis'].map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  </section>
);

export default Javis;
