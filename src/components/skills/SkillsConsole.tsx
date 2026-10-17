import React, { useState } from 'react';
import { Terminal, CheckCircle2, Wrench, Database, Layout, Cpu, ShieldCheck } from 'lucide-react';
import { SKILL_GROUPS } from '../../data/portfolioData';

export const SkillsConsole: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_GROUPS.map(g => g.category)];

  const displayedGroups = activeCategory === 'All'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter(g => g.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1.5 uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Production Competency & Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Technical Skills & Production Tools
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Engineered with modern full-stack standards, rigorous automated testing, and scalable architecture design.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                type="button"
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-emerald-400 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedGroups.map((group) => (
            <div
              key={group.category}
              className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 font-mono text-xs space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-300">
                <span className="font-bold text-white flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{group.category}</span>
                </span>
                <span className="text-[10px] text-zinc-500 uppercase">Production Grade</span>
              </div>

              <div className="space-y-2 pt-1">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${skill.isKey ? 'text-emerald-400' : 'text-zinc-500'}`} />
                      <span className="font-semibold text-zinc-200">{skill.name}</span>
                      {skill.isKey && (
                        <span className="text-[9px] text-emerald-400 font-mono">
                          ★ Primary
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                      <span>{skill.level}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-500">{skill.experience}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional methodologies row */}
        <div className="mt-6 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300 font-semibold">Engineering Methodologies:</span>
            <span>Agile/Scrum · REST API Design · Automated CI/CD Pipelines · Unit & Integration Testing with Vitest · Code Reviews</span>
          </div>
          <span className="text-zinc-500 text-[11px]">Strict Clean Code Principles</span>
        </div>
      </div>
    </section>
  );
};
