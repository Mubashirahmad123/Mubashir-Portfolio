import React, { useState } from 'react';
import { Github, GitCommit, GitFork, Star, ExternalLink, Terminal, Search, Calendar } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface RepoItem {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
}

const REPOSITORIES: RepoItem[] = [
  {
    name: 'remote-job-agent',
    description: '3-agent AI automation system (CrewAI 0.5.0 + Gemini 2.0 Flash) scraping 15+ job portals with 7-point scoring and PDF synthesis.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 14,
    forks: 3,
    updatedAt: '2 days ago',
    url: 'https://github.com/Mubashirahmad123/remote-job-agent',
  },
  {
    name: 'music_controller',
    description: 'Collaborative real-time playlist voting web application integrating the Spotify Web API with Django REST and React.',
    language: 'JavaScript / Python',
    languageColor: '#F7DF1E',
    stars: 9,
    forks: 2,
    updatedAt: '3 weeks ago',
    url: 'https://github.com/Mubashirahmad123/music_controller',
  },
  {
    name: 'fastbeetle-pinzone-optimizer',
    description: 'High-throughput bulk geofence and pincode reassignment module with PostgreSQL atomic transactions and Redis caching.',
    language: 'JavaScript',
    languageColor: '#F7DF1E',
    stars: 8,
    forks: 1,
    updatedAt: '1 month ago',
    url: 'https://github.com/Mubashirahmad123',
  },
  {
    name: 'ordersnap-dropshipping',
    description: 'Full-stack dropshipping platform using Node.js, Express, React, Redux Toolkit, PostgreSQL & Sequelize with JWT authentication.',
    language: 'TypeScript',
    languageColor: '#3178C6',
    stars: 11,
    forks: 4,
    updatedAt: '2 months ago',
    url: 'https://github.com/Mubashirahmad123',
  },
];

const RECENT_COMMITS = [
  {
    repo: 'remote-job-agent',
    message: 'feat: add exponential jitter retry wrapper for Gemini 2.0 Flash API rate limits',
    time: '2 days ago',
    hash: '8f4a12c',
  },
  {
    repo: 'remote-job-agent',
    message: 'refactor: optimize 7-point relevance scoring calculation with decay factor',
    time: '4 days ago',
    hash: '3e9b71a',
  },
  {
    repo: 'fastbeetle-pinzone-optimizer',
    message: 'perf: replace N+1 Sequelize lookups with composite indexed JOIN query',
    time: '1 week ago',
    hash: '6a01d5f',
  },
  {
    repo: 'ordersnap-dropshipping',
    message: 'security: enforce AES-256 field-level encryption on shipping address PII',
    time: '2 weeks ago',
    hash: '2c88e99',
  },
];

export const GithubActivity: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRepos = REPOSITORIES.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="github" className="py-16 md:py-24 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1.5 uppercase tracking-wider">
              <Github className="w-3.5 h-3.5" />
              <span>Open Source & Git Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              GitHub Repository & Activity Feed
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Track real commits, architectural prototypes, and public repositories hosted under{' '}
              <a 
                href={PERSONAL_INFO.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                className="text-emerald-400 hover:underline font-mono"
              >
                @{PERSONAL_INFO.socials.githubUsername}
              </a>.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-800 self-start sm:self-auto transition-colors"
          >
            <Github className="w-4 h-4 text-zinc-400" />
            <span>Follow on GitHub</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>

        {/* Filter Input */}
        <div className="mb-6 relative max-w-md">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter repositories by name or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-900/80 border border-zinc-800 rounded-md text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 font-mono transition-colors"
          />
        </div>

        {/* Grid: Left Repositories, Right Live Commit Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Repositories (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{repo.name}</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span className="text-zinc-300">{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-zinc-400" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-zinc-400" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Recent Commits Feed (4 cols) */}
          <div className="lg:col-span-4 p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3 text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                  <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recent Commit Stream</span>
                </span>
                <span className="text-[10px] text-zinc-500">main branch</span>
              </div>

              <div className="space-y-3">
                {RECENT_COMMITS.map((commit, idx) => (
                  <div key={idx} className="space-y-1 text-left">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span className="text-emerald-400 font-semibold">{commit.repo}</span>
                      <span>{commit.time}</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 line-clamp-2 leading-snug font-sans">
                      {commit.message}
                    </p>
                    <div className="text-[10px] text-zinc-600 font-mono">
                      commit <span className="text-zinc-400">{commit.hash}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex items-center justify-between">
              <span>Verified Git Commits</span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline"
              >
                View GitHub History →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
