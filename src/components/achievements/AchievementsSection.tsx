import React from 'react';
import { Trophy, CheckCircle2, TrendingUp, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      title: '1,042 Automated Tests Passed',
      subtitle: 'Remote Job Agent · Python & Docker CI',
      description: 'Comprehensive test suite covering 45+ scrapers, 5-tier LLM fallback resilience, FAISS semantic scoring, and 68 frontend E2E browser interactions.',
      badge: 'Test Rigor',
      icon: ShieldCheck,
      stat: '1,042 / 1,042',
      statLabel: 'Passing Tests'
    },
    {
      title: '70% Latency Optimization',
      subtitle: 'FastBeetle Logistics · 5 Operational Dashboards',
      description: 'Eliminated N+1 relational queries, restructured PostgreSQL composite indexes, and implemented Redis write-through caching under live delivery traffic.',
      badge: 'Production Impact',
      icon: TrendingUp,
      stat: '-70%',
      statLabel: 'Average Page Load'
    },
    {
      title: '90% Manual Effort Reduction',
      subtitle: 'Bulk PinZone Reassignment Module',
      description: 'Engineered an automated geofence and pincode reassignment engine with atomic transaction rollbacks, saving multiple engineering hours every week.',
      badge: 'Automation',
      icon: Zap,
      stat: '90%',
      statLabel: 'Ops Effort Saved'
    },
    {
      title: '45+ Job Boards Automated',
      subtitle: 'Multi-Source AI Pipeline',
      description: 'Built autonomous extraction using Playwright stealth, Crawl4AI, and APIs with MD5 deduplication and automated bi-weekly cron scheduling.',
      badge: 'AI Systems',
      icon: Cpu,
      stat: '45+',
      statLabel: 'Portals Scraped'
    }
  ];

  return (
    <section id="achievements" className="py-16 md:py-24 border-b border-zinc-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider font-semibold">
            <Trophy className="w-4 h-4" />
            <span>Milestones & Verifiable Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Achievements & Production Metrics
          </h2>
          <p className="text-sm text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
            Quantifiable engineering milestones across startup infrastructure, automated AI agent workflows, and test coverage.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/70 dark:bg-[#0D111A] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <div className="text-2xl font-bold font-mono text-white tabular-nums tracking-tight">
                    {item.stat}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 mb-3">
                    {item.statLabel}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-xs text-emerald-400 font-mono mt-0.5 mb-2">
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Production Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
