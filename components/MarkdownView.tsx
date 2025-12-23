
import React from 'react';

interface MarkdownViewProps {
  markdown: string;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({ markdown }) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-10 border border-white/10 text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl h-full">
      <pre className="whitespace-pre-wrap">{markdown}</pre>
    </div>
  );
};

export default MarkdownView;
