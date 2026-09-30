import React from 'react';
import SectionHeading from './SectionHeading';

const groups = [
  {
    name: 'Agents & LLM systems',
    featured: true,
    items: ['Context & memory', 'Reference resolution', 'LLM tool-calling', 'Structured extraction', 'gRPC / Protobuf', 'DynamoDB'],
  },
  {
    name: 'Voice & real-time',
    items: ['LiveKit', 'WebRTC', 'SIP', 'FreeSWITCH', 'OpenSIPS'],
  },
  {
    name: 'Languages',
    items: ['Python', 'Ruby', 'Java', 'JavaScript', 'C++', 'SQL', 'KQL', 'HTML', 'CSS'],
  },
  {
    name: 'Frameworks & tools',
    items: ['FastAPI', 'Ruby on Rails', 'Spring Boot', 'Airflow', 'Kafka', 'Redis', 'Docker', 'ELK Stack'],
  },
  {
    name: 'AWS',
    items: ['S3', 'SQS', 'MSK', 'CloudWatch', 'CloudFront', 'ECR'],
  },
  {
    name: 'Cloudflare',
    items: ['DNS', 'Workers AI', 'R2', 'CDN'],
  },
];

const Skills = () => (
  <section id="skills" className="scroll-mt-20 border-t border-white/[0.06] py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading index="04" eyebrow="Toolbox" title="What I work with" />

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.name}
            className={`reveal card p-6 ${group.featured ? 'border-cyan-300/25 md:col-span-2' : ''}`}
          >
            <h3 className={`mb-4 font-mono text-xs uppercase tracking-[0.2em] ${group.featured ? 'text-cyan-300' : 'text-zinc-500'}`}>
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className={group.featured ? 'chip border-cyan-300/30 bg-cyan-300/[0.06] text-sm text-cyan-100' : 'chip text-sm'}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
