import React, { useState, useEffect } from 'react';
import { X, BookOpen, ChevronRight, ChevronLeft, Copy, Check, ArrowRight, Lightbulb, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { CASE_STUDY_STEPS } from '../../data/caseStudySteps';

interface CaseStudyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialStepId?: number;
}

export const CaseStudyDrawer: React.FC<CaseStudyDrawerProps> = ({
  isOpen,
  onClose,
  initialStepId = 1,
}) => {
  const [activeStepId, setActiveStepId] = useState<number>(initialStepId);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialStepId) setActiveStepId(initialStepId);
  }, [initialStepId]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStep = CASE_STUDY_STEPS.find(s => s.id === activeStepId) || CASE_STUDY_STEPS[0];

  const handleCopySnippet = () => {
    if (!currentStep.promptOrCode?.content) return;
    navigator.clipboard.writeText(currentStep.promptOrCode.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (activeStepId < CASE_STUDY_STEPS.length) {
      setActiveStepId(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepId > 1) {
      setActiveStepId(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl h-[92vh] bg-[#0A0D15] border border-zinc-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200 font-sans"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Behind-The-Scenes Engineering Case Study
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                From Architecture Plan to Production Portfolio
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-mono text-zinc-500">
              Step {currentStep.id} of {CASE_STUDY_STEPS.length}
            </span>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close case study"
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 9-Step Horizontal Navigation Strip */}
        <div className="px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center gap-1.5 overflow-x-auto text-xs font-mono shrink-0">
          {CASE_STUDY_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              type="button"
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeStepId === step.id
                  ? 'bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <span className="text-[10px] opacity-60">0{step.id}</span>
              <span>{step.title.replace('How I ', '')}</span>
            </button>
          ))}
        </div>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step Header */}
          <div className="space-y-2">
            <div className="inline-block text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              {currentStep.badge}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentStep.title}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              {currentStep.summary}
            </p>
          </div>

          {/* Why It Matters Callout */}
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                The Engineering Rationale
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {currentStep.whyItMatters}
              </p>
            </div>
          </div>

          {/* Key Insights List */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Key Insights & Architectural Decisions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentStep.keyInsights.map((insight, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300 leading-relaxed">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt or Code Artifact Box */}
          {currentStep.promptOrCode && (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between pb-1 text-zinc-400">
                <span className="font-semibold text-white uppercase text-[11px] tracking-wider">
                  {currentStep.promptOrCode.title}
                </span>
                <button
                  onClick={handleCopySnippet}
                  type="button"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Pattern</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs overflow-x-auto leading-relaxed max-h-72">
                <code>{currentStep.promptOrCode.content}</code>
              </pre>

              <p className="text-[11px] text-zinc-400 font-sans">
                {currentStep.promptOrCode.explanation}
              </p>
            </div>
          )}

          {/* Before vs After Comparison */}
          {currentStep.beforeVsAfter && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Contrast: The Common Mistake vs The Engineered Solution
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Before */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                    ✕ {currentStep.beforeVsAfter.beforeTitle}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {currentStep.beforeVsAfter.beforeText}
                  </p>
                </div>

                {/* After */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    ✓ {currentStep.beforeVsAfter.afterTitle}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {currentStep.beforeVsAfter.afterText}
                  </p>
                  <div className="text-[11px] font-mono text-emerald-400 pt-1 border-t border-emerald-900/30">
                    Impact: {currentStep.beforeVsAfter.impact}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Actionable Takeaways
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {currentStep.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">·</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="px-6 py-3.5 border-t border-zinc-800 bg-zinc-950/90 flex items-center justify-between shrink-0 font-mono text-xs">
          <button
            onClick={handlePrev}
            disabled={activeStepId === 1}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="text-zinc-500 text-[11px]">
            {activeStepId} / {CASE_STUDY_STEPS.length}
          </div>

          <button
            onClick={handleNext}
            disabled={activeStepId === CASE_STUDY_STEPS.length}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold disabled:opacity-40 transition-colors cursor-pointer"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
