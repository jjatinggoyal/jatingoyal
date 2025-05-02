import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid config
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'monospace',
  fontSize: 14,
  darkMode: true,
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const chartId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (elementRef.current) {
      mermaid.render(chartId, chart).then(({ svg }) => {
        if (elementRef.current) {
          elementRef.current.innerHTML = svg;
        }
      }).catch(error => {
        console.error('Mermaid rendering failed:', error);
        if (elementRef.current) {
          elementRef.current.innerHTML = `
            <div class="p-4 bg-red-500/10 text-red-500 rounded-lg">
              Failed to render diagram: ${error.message}
            </div>
          `;
        }
      });
    }
  }, [chart, chartId]);

  return (
    <div 
      ref={elementRef}
      className={`my-8 p-4 rounded-lg bg-slate-900/50 ${className || ''}`}
    />
  );
};

export default MermaidDiagram;