import React from 'react';
import { AudioLines, BrainCircuit, Mails, Scale } from 'lucide-react';
import SectionHeading from './SectionHeading';

const now = [
  {
    icon: BrainCircuit,
    title: 'Memory for AI agents',
    body: 'Helping agents remember what a conversation is about: what was asked, what was said and what was agreed. Follow-ups like "the second one" just work, and agents can pick up where they left off.',
  },
  {
    icon: Mails,
    title: 'Conversations across chat and email',
    body: 'Extending that memory to long email threads with several people, so an agent keeps track of who said what and who committed to what.',
  },
  {
    icon: Scale,
    title: 'Agents that make reliable decisions',
    body: 'Building blocks that let agents negotiate and schedule in business workflows, making consistent, explainable decisions rather than leaving everything to a language model.',
  },
];

const Javis = () => (
  <section id="javis" className="relative scroll-mt-20 py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        index="01"
        eyebrow="Now · Javis Technologies"
        title={
          <>
            Building <span className="text-gradient">AI agents for real business work</span>
          </>
        }
      >
        Since November 2025 I&apos;ve been a Senior AI Engineer at Javis in Bangalore, working on the core of its agentic
        AI platform.
      </SectionHeading>

      <div className="grid gap-6 md:grid-cols-3">
        {now.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="reveal card group relative overflow-hidden p-6 transition-colors hover:border-white/15 md:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/0 blur-3xl transition-colors duration-500 group-hover:bg-cyan-400/10" />
            <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
              <Icon className="h-5 w-5 text-cyan-300" />
            </span>
            <h3 className="mb-3 font-display text-xl font-medium text-white">{title}</h3>
            <p className="leading-relaxed text-zinc-400">{body}</p>
          </article>
        ))}
      </div>

      <article className="reveal card mt-6 flex flex-col gap-6 p-6 md:flex-row md:items-start md:p-8">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
          <AudioLines className="h-5 w-5 text-violet-300" />
        </span>
        <div className="flex-1">
          <p className="eyebrow mb-2 !text-violet-300/80">Earlier at Javis</p>
          <h3 className="mb-3 font-display text-xl font-medium text-white">Voice AI agent</h3>
          <p className="max-w-3xl leading-relaxed text-zinc-400">
            Built a real-time voice agent that answered live customer calls in English and Hindi, along with the phone
            system that connects callers to it.
          </p>
        </div>
      </article>
    </div>
  </section>
);

export default Javis;
