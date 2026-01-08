'use client';

import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';


const GiscusComments: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="giscus mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
      <Giscus
        id="comments"
        host="https://jatingoyal.com"
        repo="jjatinggoyal/jatingoyal"
        repoId="R_kgDOOjCfsw"
        category="General"
        categoryId="DIC_kwDOOjCfs84CsqAg"
        mapping="title"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
};

export default GiscusComments;
