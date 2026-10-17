import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Code2, Layers, Cpu, ExternalLink, Github, Terminal } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';

interface CodeInspectModalProps {
  projectId: string | null;
  onClose: () => void;
  onOpenSimulator: (projectId: string) => void;
}

export const CodeInspectModal: React.FC<CodeInspectModalProps> = ({
  projectId,
  onClose,
  onOpenSimulator,
}) => {
  const project = PROJECTS.find(p => p.id === projectId);
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'decisions'>('architecture');
  const [activeSnippetIdx, setActiveSnippetIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  const currentSnippet = project.architecture.codeSnippets[activeSnippetIdx];

  const handleCopy = () => {
    if (!currentSnippet) return;
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-[#0E131F] border border-zinc-700/80 rounded-xl shadow-2xl flex flex-col overflow-hidden text-zinc-200 font-sans"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
            <div>
              <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
                Architecture & Source Inspector
              </span>
              <h3 className="text-sm font-bold text-white tracking-tight">{project.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.hasSimulator && (
              <button
                onClick={() => onOpenSimulator(project.id)}
                type="button"
                className="px-2.5 py-1 text-xs font-mono text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 rounded border border-emerald-800 transition-colors cursor-pointer"
              >
                Run Simulator
              </button>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
              title="Open GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close dialog"
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 py-2 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeTab === 'architecture' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            System Flow Diagram
          </button>
          {project.architecture.codeSnippets.length > 0 && (
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                activeTab === 'code' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Source Code Snippets ({project.architecture.codeSnippets.length})
            </button>
          )}
          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeTab === 'decisions' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Engineering Trade-Offs
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Architecture Tab */}
          {activeTab === 'architecture' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 font-sans leading-relaxed">
                <span className="font-semibold text-white block mb-1 font-mono text-xs uppercase tracking-wider text-emerald-400">
                  Architectural Overview
                </span>
                {project.architecture.overview}
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                  ASCII Flow Diagram
                </span>
                <pre className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400 text-xs overflow-x-auto font-mono leading-relaxed">
                  {project.architecture.diagram}
                </pre>
              </div>

              {/* Tech Stack Breakdown */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                  Production Stack Layers
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.architecture.techStack.map((stack, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-[10px] text-zinc-400 uppercase font-semibold">{stack.category}</div>
                      <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-zinc-200">
                        {stack.items.map(item => (
                          <span key={item} className="text-zinc-300 font-mono">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Code Snippets Tab */}
          {activeTab === 'code' && currentSnippet && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800">
                {/* File picker if multiple */}
                <div className="flex items-center gap-2">
                  {project.architecture.codeSnippets.map((snip, i) => (
                    <button
                      key={snip.filename}
                      onClick={() => setActiveSnippetIdx(i)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                        activeSnippetIdx === i 
                          ? 'bg-zinc-800 text-emerald-400 font-bold border border-zinc-700' 
                          : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      {snip.filename}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-zinc-400 font-sans">
                {currentSnippet.description}
              </p>

              <pre className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-[11px] overflow-x-auto leading-relaxed max-h-96">
                <code>{currentSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Decisions Tab */}
          {activeTab === 'decisions' && (
            <div className="space-y-3 font-sans text-xs">
              <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider mb-2 font-semibold">
                Critical Engineering Choices & Trade-Offs
              </div>
              <ul className="space-y-3">
                {project.architecture.keyDecisions.map((decision, idx) => (
                  <li key={idx} className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
                    <span className="font-mono text-emerald-400 font-bold shrink-0">0{idx + 1}.</span>
                    <span className="text-zinc-300 leading-relaxed">{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
