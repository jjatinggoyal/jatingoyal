import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Check, Copy } from 'lucide-react';

interface CodeDemoProps {
  title?: string;
  children: string;
}

const CodeDemo: React.FC<CodeDemoProps> = ({ title, children }) => {
  const [code, setCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Extract code from children (removes the code block syntax)
    const codeMatch = children.match(/```[\w]*\n([\s\S]*?)```/);
    if (codeMatch) {
      setCode(codeMatch[1].trim());
    }
  }, [children]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-lg border theme-border">
      {title && (
        <div className="px-4 py-2 theme-bg-secondary border-b theme-border">
          <h3 className="text-sm font-medium theme-text-primary">{title}</h3>
        </div>
      )}
      
      <LiveProvider code={code} noInline={code.includes('render(')}>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative">
            <div className="absolute right-2 top-2 z-10">
              <button
                onClick={handleCopy}
                className="p-2 rounded theme-bg-secondary text-slate-400 hover:text-slate-100 transition-colors"
                title={isCopied ? 'Copied!' : 'Copy code'}
              >
                {isCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <LiveEditor 
              className="!bg-slate-900 !p-4 min-h-[200px] !font-mono !text-sm"
            />
          </div>
          <div className="lg:w-1/2 p-4 theme-bg-secondary border-t lg:border-t-0 lg:border-l theme-border">
            <LiveError className="text-red-400 text-sm mb-2" />
            <LivePreview className="rounded" />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
};

export default CodeDemo;