import React from 'react';

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
};

const SectionHeading = ({ index, eyebrow, title, children }: Props) => (
  <div className="reveal mb-12 max-w-3xl">
    <p className="eyebrow mb-4">
      <span className="text-zinc-500">{index} /</span> {eyebrow}
    </p>
    <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">
      {title}
    </h2>
    {children && <p className="mt-5 text-lg leading-relaxed text-zinc-400">{children}</p>}
  </div>
);

export default SectionHeading;
