import React from 'react';
import { Cpu, Layers, Server, Clock, CheckCircle2, ArrowRight, MessageSquare, Zap } from 'lucide-react';
import { FREELANCE_SERVICES } from '../../data/portfolioData';

interface FreelanceSectionProps {
  onOpenContact: () => void;
}

export const FreelanceSection: React.FC<FreelanceSectionProps> = ({ onOpenContact }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-amber-400" />;
      default:
        return <Zap className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="freelance" className="py-16 md:py-24 border-b border-zinc-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Contract & Consulting Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Freelance Software Engineering Services
            </h2>
            <p className="text-sm text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
              Available for select full-stack engineering contracts, autonomous AI agent pipelines, payment gateway integrations, and backend database performance optimization.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs self-start md:self-auto transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss a Project</span>
          </button>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FREELANCE_SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900/70 dark:bg-[#0D111A] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 text-zinc-400 font-mono text-[11px] border border-zinc-700/60">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{service.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{service.description}</p>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block">
                    Core Deliverables
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/60">
                <button
                  onClick={onOpenContact}
                  type="button"
                  className="w-full py-2.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 text-xs font-mono font-medium flex items-center justify-center gap-2 border border-zinc-700/60 transition-colors cursor-pointer"
                >
                  <span>Request Scope & Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
