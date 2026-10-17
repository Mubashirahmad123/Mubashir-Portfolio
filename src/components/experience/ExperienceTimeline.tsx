import React from 'react';
import { Briefcase, Calendar, MapPin, GraduationCap, CheckCircle2, Award } from 'lucide-react';
import { EXPERIENCES, PERSONAL_INFO } from '../../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1.5 uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History & Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Engineering Experience & Production Impact
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Demonstrated engineering leadership across logistics startups, software agencies, and distributed platforms with quantifiable business outcomes.
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/80 transition-colors"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">{exp.role}</h3>
                    <span className="text-xs text-zinc-500 font-mono">@</span>
                    <span className="text-sm font-semibold text-emerald-400">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono mt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span>{exp.location}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      <span>{exp.period}</span>
                    </span>
                  </div>
                </div>

                {/* Highlight metric badge */}
                <div className="self-start sm:self-auto px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                  {exp.highlightMetric}
                </div>
              </div>

              {/* Bullets */}
              <div className="pt-4 space-y-2.5">
                {exp.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack tags */}
              <div className="mt-5 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-500">Tech:</span>
                {exp.techStack.map((tech, i) => (
                  <React.Fragment key={tech}>
                    <span className="text-zinc-300">{tech}</span>
                    {i < exp.techStack.length - 1 && <span className="text-zinc-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

          {/* Education Card */}
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {PERSONAL_INFO.education.degree}
                </h4>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">
                  {PERSONAL_INFO.education.institution} · {PERSONAL_INFO.education.location}
                </div>
              </div>
            </div>

            <div className="text-xs text-zinc-400 font-mono self-start sm:self-auto">
              {PERSONAL_INFO.education.period}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
