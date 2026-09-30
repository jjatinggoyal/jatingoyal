import React from 'react';
import SectionHeading from './SectionHeading';

const roles = [
  {
    period: 'Nov 2025 — Present',
    title: 'Senior AI Engineer',
    org: 'Javis Technologies',
    place: 'Bangalore, IN',
    current: true,
    summary: 'Building AI agents that remember conversations and make reliable decisions in business workflows. Earlier, a real-time voice agent for customer calls.',
    link: { href: '#javis', label: 'See the work above' },
  },
  {
    period: 'Jul 2022 — Nov 2025',
    title: 'Software Engineer → Senior Software Engineer',
    org: 'Enphase Energy',
    place: 'Bangalore, IN',
    points: [
      'Designed and built a Translation Management System that centrally manages i18n across a suite of microservices and microfrontends and delivers translations to services dynamically. PMs could update app text directly, with no code changes.',
      'Improved search on the core Data entity by 95% with a denormalized Elasticsearch index that resolved data fragmentation across RDS and MongoDB, kept in sync in real time with Kafka and Logstash.',
    ],
    tags: ['Ruby on Rails', 'Elasticsearch', 'Kafka', 'Logstash', 'MongoDB', 'RDS'],
  },
  {
    period: 'Jul 2018 — Apr 2022',
    title: 'B.Tech, Computer Science & Engineering',
    org: 'Indian Institute of Technology, Delhi',
    place: 'New Delhi, IN',
  },
];

const Experience = () => (
  <section id="experience" className="scroll-mt-20 border-t border-white/[0.06] py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading index="02" eyebrow="Experience" title="Where I've worked" />

      <ol className="relative border-l border-white/10 md:ml-[11rem]">
        {roles.map((role) => (
          <li key={role.org} className="reveal relative pb-14 pl-8 last:pb-0 md:pl-10">
            <span
              className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full ${
                role.current ? 'pulse-dot bg-emerald-400' : 'bg-zinc-600'
              }`}
            />
            <p className="mb-2 font-mono text-xs text-zinc-500 md:absolute md:-left-[11rem] md:top-1 md:mb-0 md:w-36 md:text-right">
              {role.period}
            </p>
            <h3 className="font-display text-xl font-medium text-white md:text-2xl">{role.title}</h3>
            <p className="mt-1 text-zinc-400">
              {role.org} <span className="text-zinc-600">· {role.place}</span>
            </p>
            {role.summary && <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">{role.summary}</p>}
            {role.link && (
              <a href={role.link.href} className="mt-3 inline-block font-mono text-sm text-cyan-300 hover:text-cyan-200">
                ↑ {role.link.label}
              </a>
            )}
            {role.points && (
              <ul className="mt-4 max-w-2xl space-y-3">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-zinc-400">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {role.tags && (
              <div className="mt-5 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
